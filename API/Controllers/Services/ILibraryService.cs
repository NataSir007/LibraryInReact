using Domain;

/// <summary>
/// Service interface for library-related operations.
/// </summary>
public interface ILibraryService
{
    /// <summary>
    /// Retrieves a list of all libraries.
    /// </summary>
    /// <returns>A list of <see cref="Library"/> objects.</returns>
    Task<List<Library>> GetLibrariesAsync();

    /// <summary>
    /// Retrieves a single library by its ID.
    /// </summary>
    /// <param name="id">The ID of the library.</param>
    /// <returns>The <see cref="Library"/> object if found; otherwise, null.</returns>
    Task<Library?> GetLibraryAsync(int id);

    /// <summary>
    /// Retrieves all opening hours.
    /// </summary>
    /// <param name="weekOffset">weekOffset is an integer parameter that represents how many weeks to move forward or backward from the current week.</param>
    /// <returns>Opening hours for a week, including week number and a list of 7 days(OpeningHourDayDto).</returns>
    Task<OpeningHourWeekDto> GetOpeningHoursAsync(int weekOffset);

    /// <summary>
    /// Determine library status based on current date/time, opening hours, and holiday weeks.
    /// If it is closed at the moment, give information when it will be open next time.
    /// </summary>
    /// <returns></returns>
    Task<LibraryOpenStatusDto> GetLibraryOpenStatusAsync();

}