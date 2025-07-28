using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace LibraryInReact.API.Controllers.Services
{
    public class EventService : IEventService
    {
        private readonly AppDbContext _context;

        public EventService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EventSummaryDto>> GetEventsAsync(string languageCode = "fi")
        {
            return _context.Events
                .Include(e => e.Library)
                .Include(e => e.EventImage)
                .Include(e => e.Translations)
                .Include(e => e.EventTags)
                    .ThenInclude(et => et.Tag)
                .AsEnumerable()
                .Select(e => {
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
                })
                .ToList();
        }

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

        public async Task<List<string>> GetAllTagNamesAsync()
        {
            return await _context.Tags.Select(t => t.Name).ToListAsync();
        }
    }
}
