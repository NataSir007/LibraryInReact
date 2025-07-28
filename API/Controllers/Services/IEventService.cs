using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using Domain;

namespace LibraryInReact.API.Controllers.Services
{
    public interface IEventService
    {
        Task<List<EventSummaryDto>> GetEventsAsync(string languageCode);
        Task<Event?> GetEventAsync(int id);
        Task<List<string>> GetAllTagNamesAsync();
    }
}
