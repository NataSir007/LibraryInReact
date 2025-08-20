using API.DTO;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace LibraryInReact.API.Controllers.Services
{
    public class EventService : IEventService
    {
        private readonly AppDbContext _context;
        /// <summary>
        /// Implementation of IEventService for event-related operations.
        /// </summary>
        /// <param name="context">Database context for accessing event data.</param>    
        public EventService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns all events for a given language (unfiltered).
        /// </summary>
        /// <param name="languageCode">Language code (e.g., "fi")</param>
        public async Task<List<EventSummaryDto>> GetAllEventsAsync(string languageCode = "fi")
        {
            var events = await _context.Events
                .Include(e => e.Library)
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags).ThenInclude(et => et.Tag)
                .ToListAsync();

            // Preload all parent events for efficiency
            var parentIds = events.Where(e => e.ParentEventId != null).Select(e => e.ParentEventId!.Value).Distinct().ToList();
            var parentEvents = await _context.Events
                .Where(e => parentIds.Contains(e.Id))
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags).ThenInclude(et => et.Tag)
                .ToListAsync();

            return events.Select(e =>
            {
                var sourceEvent = e.ParentEventId != null
                    ? parentEvents.FirstOrDefault(pe => pe.Id == e.ParentEventId)
                    : e;

                var translation = sourceEvent?.Translations.FirstOrDefault(t => t.Language == languageCode);

                return new EventSummaryDto
                {
                    Id = e.Id,
                    LibraryId = e.LibraryId,
                    LibraryTitle = e.Library.Title,
                    LibraryAddress = e.Library.Address,
                    EventName = translation != null ? translation.Title : string.Empty,
                    StartTime = e.StartTime,
                    EndTime = e.EndTime,
                    FileName = sourceEvent?.EventImage != null ? sourceEvent.EventImage.FileName : string.Empty,
                    FilePath = sourceEvent?.EventImage != null ? sourceEvent.EventImage.FilePath : string.Empty,
                    AltText = sourceEvent?.EventImage != null ? sourceEvent.EventImage.AltText : string.Empty,
                    ImageId = sourceEvent?.EventImage != null ? sourceEvent.EventImage.Id : 0,
                    Tags = (e.ParentEventId != null ? sourceEvent?.EventTags : e.EventTags)?.Select(et => et.Tag.Name).ToList() ?? new List<string>()
                };
            }).ToList();
        }

        /// <summary>
        /// Returns a single event by its ID.
        /// </summary>
        /// <param name="id">Event ID</param>
        /// <param name="languageCode">Language code (e.g., "fi")</param>
        public async Task<DetailedEventDto?> GetEventByIdAsync(int id, string languageCode)
        {
            var selectedEvent = await _context.Events
                .Include(ev => ev.Library)
                .Include(ev => ev.EventImage)
                .Include(ev => ev.Translations)
                .Include(ev => ev.EventTags).ThenInclude(et => et.Tag)
                .FirstOrDefaultAsync(ev => ev.Id == id);

            if (selectedEvent == null) return null;

            // If this event has a parent, use parent's image, translations, and tags
            var sourceEvent = selectedEvent.ParentEventId != null
                ? await _context.Events
                    .Include(ev => ev.EventImage)
                    .Include(ev => ev.Translations)
                    .Include(ev => ev.EventTags).ThenInclude(et => et.Tag)
                    .FirstOrDefaultAsync(ev => ev.Id == selectedEvent.ParentEventId)
                : selectedEvent;

            var translation = sourceEvent?.Translations.FirstOrDefault(t => t.Language == languageCode);

            return new DetailedEventDto
            {
                Id = selectedEvent.Id,
                LibraryId = selectedEvent.LibraryId,
                LibraryTitle = selectedEvent.Library.Title,
                LibraryAddress = selectedEvent.Library.Address,
                EventName = translation != null ? translation.Title : string.Empty,
                Description = translation != null ? translation.Description : string.Empty,
                Admission = translation != null ? translation.Admission : string.Empty,
                StartTime = selectedEvent.StartTime,
                EndTime = selectedEvent.EndTime,
                FileName = sourceEvent?.EventImage != null ? sourceEvent.EventImage.FileName : string.Empty,
                FilePath = sourceEvent?.EventImage != null ? sourceEvent.EventImage.FilePath : string.Empty,
                AltText = sourceEvent?.EventImage != null ? sourceEvent.EventImage.AltText : string.Empty,
                ImageId = sourceEvent?.EventImage != null ? sourceEvent.EventImage.Id : 0,
                Tags = (selectedEvent.ParentEventId != null ? sourceEvent?.EventTags : selectedEvent.EventTags)?.Select(et => et.Tag.Name).ToList() ?? new List<string>()
            };
        }

        /// <summary>
        /// Returns all tag names for events.
        /// </summary>
        public async Task<List<string>> GetAllTagNamesAsync()
        {
            return await _context.Tags.Select(t => t.Name).ToListAsync();
        }

        /// <summary>
        /// Returns filtered events by search (event title or library), startDate, and endDate. All parameters are optional and can be null.
        /// </summary>
        /// <param name="search">Event title or library name (nullable)</param>
        /// <param name="startDate">Start date in ISO 8601 format (nullable)</param>
        /// <param name="endDate">End date in ISO 8601 format (nullable)</param>
        /// <param name="languageCode">Language code (default: fi)</param>
        /// <returns>List of filtered events as EventSummaryDto.</returns>
        public async Task<List<EventSummaryDto>> FilterEventsAsync(string? search, string? startDate, string? endDate, string languageCode)
        {
            DateTime? start = null, end = null;
            if (startDate == null) startDate = DateTime.UtcNow.Date.ToString("yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);

            var query = _context.Events
                .Include(e => e.Library)
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags).ThenInclude(et => et.Tag)
                .AsQueryable();

            if (!string.IsNullOrEmpty(startDate) && DateTime.TryParse(startDate, out var parsedStart))
                start = parsedStart.Date;
            if (!string.IsNullOrEmpty(endDate) && DateTime.TryParse(endDate, out var parsedEnd))
                end = parsedEnd.Date;

            // Search filtering (event name or library)
            if (!string.IsNullOrWhiteSpace(search))
            {
                var lowered = search.ToLower().Trim();
                var matchedLibraryIds = _context.Libraries
                    .Where(l => l.Title.ToLower().Trim().Contains(lowered))
                    .Select(l => l.Id)
                    .ToList();

                if (matchedLibraryIds.Any())
                {
                    query = query.Where(e => matchedLibraryIds.Contains(e.LibraryId));
                }
                else
                {
                    var matchedEventIds = _context.EventTranslations
                        .Where(t => t.Title.ToLower().Trim().Contains(lowered) && t.Language == languageCode)
                        .Select(t => t.EventId)
                        .ToList();

                    query = query.Where(e => matchedEventIds.Contains(e.Id));
                }
            }

            // Date filtering: events that overlap the given range
            if (start.HasValue && end.HasValue)
            {
                Console.WriteLine($"Filtering with start: {start.Value.Date}, end: {end.Value.Date}");
                query = query.Where(e => e.StartTime.Date >= start.Value.Date && e.EndTime <= end.Value.Date);
            }
            else if (start.HasValue)
            {
                Console.WriteLine($"Filtering with start only: {start.Value.Date}");
                query = query.Where(e => e.StartTime.Date >= start.Value.Date);
            }

            var filteredCount = query.Count();
            Console.WriteLine($"Events after filtering: {filteredCount}");

            var events = await query.ToListAsync();
            return events.Select(e =>
            {
                var translation = e.Translations.FirstOrDefault(t => t.Language == languageCode);
                return new EventSummaryDto
                {
                    Id = e.Id,
                    LibraryId = e.LibraryId,
                    LibraryTitle = e.Library.Title,
                    LibraryAddress = e.Library.Address,
                    EventName = translation != null ? translation.Title : string.Empty,
                    StartTime = e.StartTime,
                    EndTime = e.EndTime,
                    FileName = e.EventImage != null ? e.EventImage.FileName : string.Empty,
                    FilePath = e.EventImage != null ? e.EventImage.FilePath : string.Empty,
                    AltText = e.EventImage != null ? e.EventImage.AltText : string.Empty,
                    ImageId = e.EventImage != null ? e.EventImage.Id : 0,
                    Tags = e.EventTags.Select(et => et.Tag.Name).ToList()
                };
            }).ToList();
        }


        /// <summary>
        /// Returns all futureevents in a series (i.e., with the same ParentEventId).
        /// </summary>
        /// <param name="eventId">Event ID to find the series</param>
        /// <param name="languageCode">Language code (e.g., "fi")</param>
        /// <returns>List of EventSummaryDto representing the series events.</returns>
        public async Task<List<EventSummaryDto>> GetEventSeriesAsync(int eventId, string languageCode)
        {
            // Find the event by id
            var selectedEvent = await _context.Events
                .FirstOrDefaultAsync(e => e.Id == eventId);

            // If event not found or it does not have a ParentEventId, return empty list
            if (selectedEvent == null || selectedEvent.ParentEventId == null)
                return new List<EventSummaryDto>();

            int parentId = selectedEvent.ParentEventId.Value;

            // Get all events with the same ParentEventId (i.e., siblings in the series)
            var now = DateTime.UtcNow.Date;

            var seriesEvents = await _context.Events
                .Include(e => e.Library)
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags).ThenInclude(et => et.Tag)
                .Where(e => e.ParentEventId == parentId && e.StartTime.Date >= now)
                .OrderBy(e => e.StartTime)
                .ToListAsync();

            // Load parent event for image and translations
            var parentEvent = await _context.Events
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags).ThenInclude(et => et.Tag)
                .FirstOrDefaultAsync(e => e.Id == parentId);

            return seriesEvents.Select(e =>
            {
                // Use parent event for title, image, and tags
                var sourceEvent = parentEvent ?? e;
                var translation = sourceEvent.Translations.FirstOrDefault(t => t.Language == languageCode);

                return new EventSummaryDto
                {
                    Id = e.Id,
                    LibraryId = e.LibraryId,
                    LibraryTitle = e.Library.Title,
                    LibraryAddress = e.Library.Address,
                    EventName = translation != null ? translation.Title : string.Empty,
                    StartTime = e.StartTime,
                    EndTime = e.EndTime,
                    FileName = sourceEvent.EventImage != null ? sourceEvent.EventImage.FileName : string.Empty,
                    FilePath = sourceEvent.EventImage != null ? sourceEvent.EventImage.FilePath : string.Empty,
                    AltText = sourceEvent.EventImage != null ? sourceEvent.EventImage.AltText : string.Empty,
                    ImageId = sourceEvent.EventImage != null ? sourceEvent.EventImage.Id : 0,
                    Tags = sourceEvent.EventTags.Select(et => et.Tag.Name).ToList()
                };
            }).ToList();
        }
    }    
}
