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
        /// Gets a list of all events.
        /// </summary>
        /// <returns>A list of events.</returns>
        [HttpGet]
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
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var ev = await eventService.GetEventAsync(id);
            if (ev == null) return NotFound();
            return Ok(ev);
        }
        /// <summary>
        /// Gets all tag names for events.
        /// </summary>
        /// <returns>List of tag names as strings.</returns>
        [HttpGet("/api/tags")]
        public async Task<ActionResult<List<string>>> GetTags()
        {
            var tags = await eventService.GetAllTagNamesAsync();
            return Ok(tags);
        }
    }
}
