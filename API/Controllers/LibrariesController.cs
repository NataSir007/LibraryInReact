using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;

namespace LibraryInReact.API.Controllers
{

  public class LibrariesController(AppDbContext context) : BaseApiController
  {
    [HttpGet]
    public async Task<ActionResult<List<Library>>> GetLibraries()
    {
      return await context.Libraries
        .Include(l => l.LibraryEmailContactDetails)
        .Include(l => l.LibraryPhoneNumberContactDetails)
        .Include(l => l.LibraryMailingAddresses)
        .Include(l => l.LibraryImages)
        .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Library>> GetLibrary(int id)
    {
      var library = await context.Libraries
        .Include(l => l.LibraryEmailContactDetails)
        .Include(l => l.LibraryPhoneNumberContactDetails)
        .Include(l => l.LibraryMailingAddresses)
        .Include(l => l.LibraryImages)
        .FirstOrDefaultAsync(l => l.Id == id);

      if (library == null) return NotFound();

      return library;
    }

    [HttpGet("opening-hours")]
    public async Task<ActionResult<List<OpeningHour>>> GetOpeningHours()
    {
      return await context.OpeningHours.ToListAsync();
    }

    [HttpGet("holiday-weeks")]
    public async Task<ActionResult<List<HolidayWeek>>> GetHolidayWeeks()
    {
      return await context.HolidayWeeks.ToListAsync();
    }
  }
}