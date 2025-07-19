using System;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace LibraryInReact.API.Controllers
{
  /// <summary>
  /// API controller for library-related endpoints.
  /// </summary>
  public class LibrariesController : BaseApiController
  {
    private readonly ILibraryService libraryService;

    /// <summary>
    /// Initializes a new instance of the <see cref="LibrariesController"/> class.
    /// </summary>
    /// <param name="libraryService">The library service to use for data access.</param>
    public LibrariesController(ILibraryService libraryService)
    {
      this.libraryService = libraryService;
    }

    /// <summary>
    /// Gets a list of all libraries.
    /// </summary>
    /// <returns>A list of libraries.</returns>
    [HttpGet]
    public async Task<ActionResult<List<Library>>> GetLibraries()
    {
      var libraries = await libraryService.GetLibrariesAsync();
      return Ok(libraries);
    }

    /// <summary>
    /// Gets a single library by its ID.
    /// </summary>
    /// <param name="id">The ID of the library.</param>
    /// <returns>The library if found; otherwise, NotFound.</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<Library>> GetLibrary(int id)
    {
      var library = await libraryService.GetLibraryAsync(id);
      if (library == null) return NotFound();
      return Ok(library);
    }

    /// <summary>
    /// Gets all opening hours.
    /// </summary>
    /// <returns>A list of opening hours.</returns>
    [HttpGet("opening-hours/{weekOffset}")]
    public async Task<ActionResult<OpeningHourWeekDto>> GetOpeningHours(int weekOffset)
    {
      // Fetch opening hours for the current week or specified offset
      var openingHours = await libraryService.GetOpeningHoursAsync(weekOffset);
      return openingHours;
    }

    /// <summary>
    /// Gets the library's open status based on current date/time and opening hours.
    /// If it is closed at the moment, provides information on when it will be open next time.
    /// </summary>
    [HttpGet("open-status")]
    public async Task<ActionResult<LibraryOpenStatusDto>> GetLibraryOpenStatusAsync()
    {
      var status = await libraryService.GetLibraryOpenStatusAsync();
      if (status == null)
        return NotFound();

      return Ok(status);
    }
  }
}