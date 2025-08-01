using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using Domain;

namespace LibraryInReact.API.Controllers.Services
{
    public interface IEventService
    {
        /// <summary>
        /// Returns all events for a given language (unfiltered).
        /// </summary>
        /// <param name="languageCode">Language code (e.g., "fi")</param>
        Task<List<EventSummaryDto>> GetEventsAsync(string languageCode);

        /// <summary>
        /// Returns a single event by its ID.
        /// </summary>
        /// <param name="id">Event ID</param>
        /// <param name="languageCode">Language code (e.g., "fi")</param>
        Task<DetailedEventDto?> GetEventAsync(int id, string languageCode);

        /// <summary>
        /// Returns all tag names for events.
        /// </summary>
        Task<List<string>> GetAllTagNamesAsync();
        
        /// <summary>
        /// Returns filtered events by search (event title or library), startDate, and endDate. All parameters are optional and can be null.
        /// </summary>
        /// <param name="search">Event title or library name (nullable)</param>
        /// <param name="startDate">Start date in ISO 8601 format (nullable)</param>
        /// <param name="endDate">End date in ISO 8601 format (nullable)</param>
        /// <param name="languageCode">Language code (default: fi)</param>
        Task<List<EventSummaryDto>> FilterEventsAsync(string? search, string? startDate, string? endDate, string languageCode);
    }
}
