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
        .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Library>> GetLibrary(int id)
    {
      var library = await context.Libraries
        .Include(l => l.LibraryEmailContactDetails)
        .Include(l => l.LibraryPhoneNumberContactDetails)
        .Include(l => l.LibraryMailingAddresses)
        .FirstOrDefaultAsync(l => l.Id == id);

      if (library == null) return NotFound();

      return library;
    }
  }
}