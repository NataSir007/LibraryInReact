using API.DTO;
using Domain;
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
        public async Task<List<EventSummaryDto>> GetEventsAsync(string languageCode = "fi")
        {
            var events = await _context.Events
                .Include(e => e.Library)
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags).ThenInclude(et => et.Tag)
                .ToListAsync();

            return events.Select(e => {
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
        /// Returns a single event by its ID.
        /// </summary>
        /// <param name="id">Event ID</param>
        public async Task<Event?> GetEventAsync(int id)
        {
            return await _context.Events
                .Include(e => e.Library)
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags)
                    .ThenInclude(et => et.Tag)
                .FirstOrDefaultAsync(e => e.Id == id);
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
            if (startDate == null) startDate = DateTime.UtcNow.Date.ToString("yyyy-MM-ddTHH:mm:ssZ", System.Globalization.CultureInfo.InvariantCulture);

            var query =  _context.Events
                .Include(e => e.Library)
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags).ThenInclude(et => et.Tag)
                .AsQueryable();

            if (!string.IsNullOrEmpty(startDate) && DateTime.TryParse(startDate, null, System.Globalization.DateTimeStyles.AdjustToUniversal, out var parsedStart))
                start = parsedStart;
            if (!string.IsNullOrEmpty(endDate) && DateTime.TryParse(endDate, null, System.Globalization.DateTimeStyles.AdjustToUniversal, out var parsedEnd))
                end = parsedEnd;

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
                query = query.Where(e => e.StartTime >= start.Value && e.EndTime <= end.Value);
            }
            else if (start.HasValue)
            {
                query = query.Where(e => e.StartTime >= start.Value);
            }

            var events = await query.ToListAsync();
            return events.Select(e => {
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
    }
}
