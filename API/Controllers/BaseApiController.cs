using Microsoft.AspNetCore.Mvc;

namespace LibraryInReact.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public abstract class BaseApiController : ControllerBase
  {
    // Common functionality for API controllers can be added here
  }
}