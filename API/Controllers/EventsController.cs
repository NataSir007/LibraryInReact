using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using Domain;
using LibraryInReact.API.Controllers.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace LibraryInReact.API.Controllers
{
    /// <summary>
    /// API controller for event-related endpoints.
    /// </summary>
    [Route("api/events")]
    public class EventsController : BaseApiController
    {
        private readonly IEventService eventService;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventsController"/> class.
        /// </summary>
        /// <param name="eventService">The event service to use for data access.</param>
        public EventsController(IEventService eventService)
        {
            this.eventService = eventService;
        }

        /// <summary>
        /// Returns all events for a given language (unfiltered).
        /// </summary>
        /// <param name="languageCode">Language code (e.g., "fi")</param>
        [HttpGet]   // GET: api/events?languageCode=fi  
        public async Task<ActionResult<List<EventSummaryDto>>> GetEvents(string languageCode = "fi")
        {
            var events = await eventService.GetEventsAsync(languageCode);
            return Ok(events);
        }

        /// <summary>
        /// Gets a single event by its ID.
        /// </summary>
        /// <param name="id">The ID of the event.</param>
        /// <returns>The event if found; otherwise, NotFound.</returns>
        /// <param name="languageCode">Language code (e.g., "fi")</param>
        [HttpGet("{id}")]   // GET: api/events/{id}?languageCode=fi 
        public async Task<ActionResult<DetailedEventDto>> GetEvent(int id, string languageCode = "fi")
        {
            var ev = await eventService.GetEventAsync(id, languageCode);
            if (ev == null) return NotFound();
            return Ok(ev);
        }
        /// <summary>
        /// Gets all tag names for events.
        /// </summary>
        /// <returns>List of tag names as strings.</returns>
        [HttpGet("tags")]   // GET: api/events/tags
        public async Task<ActionResult<List<string>>> GetTags()
        {
            var tags = await eventService.GetAllTagNamesAsync();
            return Ok(tags);
        }

        /// <summary>
        /// Returns filtered events by search (event title or library), startDate, and endDate. All parameters are optional and can be null.
        /// </summary>
        /// <param name="search">Event title or library name (nullable)</param>
        /// <param name="startDate">Start date in ISO 8601 format (nullable)</param>
        /// <param name="endDate">End date in ISO 8601 format (nullable)</param>
        /// <param name="languageCode">Language code (default: fi)</param>
        /// <returns>List of filtered events as EventSummaryDto.</returns>
        [HttpGet("filter")] // GET: api/events/filter?search=...&startDate=...&endDate=...&languageCode=fi
        public async Task<ActionResult<List<EventSummaryDto>>> FilterEvents(
            [FromQuery] string? search = null,
            [FromQuery] string? startDate = null,
            [FromQuery] string? endDate = null,
            [FromQuery] string languageCode = "fi")
        {
            // Calls EventService to filter events based on provided parameters
            var events = await eventService.FilterEventsAsync(search, startDate, endDate, languageCode);
            return Ok(events ?? new List<EventSummaryDto>());
        }
    }
}
