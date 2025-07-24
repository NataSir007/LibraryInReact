using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Persistence;

/// <summary>
/// Implementation of ILibraryService for library-related operations.
/// </summary>
public class LibraryService : ILibraryService
{
  private readonly AppDbContext _context;

  public LibraryService(AppDbContext context)
  {
    _context = context;
  }

  /// <inheritdoc />
  public async Task<List<Library>> GetLibrariesAsync()
  {
    return await _context.Libraries
      .Include(l => l.NoteTranslations)
      .Include(l => l.LibraryEmailContactDetails)
      .Include(l => l.LibraryPhoneNumberContactDetails)
      .Include(l => l.LibraryMailingAddresses)
      .Include(l => l.LibraryImages)
      .ToListAsync();
  }

  /// <inheritdoc />
  public async Task<Library?> GetLibraryAsync(int id)
  {
    return await _context.Libraries
        .Include(l => l.NoteTranslations)
        .Include(l => l.LibraryEmailContactDetails)
        .Include(l => l.LibraryPhoneNumberContactDetails)
        .Include(l => l.LibraryMailingAddresses)
        .Include(l => l.LibraryImages)
        .FirstOrDefaultAsync(l => l.Id == id);
  }

  /// <inheritdoc />
  public async Task<OpeningHourWeekDto> GetOpeningHoursAsync(int weekOffset = 0)
  {
    var holidayWeeks = await _context.HolidayWeeks.ToListAsync();
    var openingHours = await _context.OpeningHours.ToListAsync();

    var timeZoneId = "Europe/Helsinki"; // hard coded for now
    DateTime dateUtc = DateTime.UtcNow;
    
    var timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
    var todayUtc = DateTime.UtcNow;
    var todayLocal = TimeZoneInfo.ConvertTimeFromUtc(todayUtc, timeZone);

    // Calculate current week and start of week (Monday)
    var currentWeek = todayLocal.AddDays(weekOffset * 7);
    int weekNumber = GetWeekNumber(currentWeek, timeZoneId);
    int dayOfWeek = ((int)currentWeek.DayOfWeek + 6) % 7; // Monday=0, ..., Sunday=6
    var startOfWeek = currentWeek.AddDays(-dayOfWeek);

    var holidayWeek = holidayWeeks.FirstOrDefault(hw => hw.WeekNumber == weekNumber);

    var weekDays = new List<OpeningHourDayDto>();
    for (int i = 0; i < 7; i++)
    {
        var date = startOfWeek.AddDays(i);
        bool isToday = date.Date == todayLocal.Date;
        OpeningHourType openingHourType = holidayWeek != null
            ? GetOpeningHourTypeFromHolidayWeek(holidayWeek, i)
            : GetRegularWeekOpeningHourType(i);

        WeekType weekType = holidayWeek != null ? WeekType.PublicHolidayWeek : WeekType.RegularWeek;
        var openingHour = openingHours.FirstOrDefault(
            oh => oh.OpeningHourType == openingHourType && oh.WeekType == weekType);

        string timeDisplay = "N/A";
        if (openingHour != null)
        {
            string openingTime = FormatTime(openingHour.OpeningTime);
            string closingTime = FormatTime(openingHour.ClosingTime);
            timeDisplay = (openingTime == "00" && closingTime == "00")
                ? "Closed"
                : $"{openingTime}–{closingTime}";
        }
        else if (weekType == WeekType.PublicHolidayWeek)
        {
            // Fallback to regular week
            var regularOpeningHour = openingHours.FirstOrDefault(
                oh => oh.OpeningHourType == openingHourType && oh.WeekType == WeekType.RegularWeek);
            if (regularOpeningHour != null)
            {
                string openingTime = FormatTime(regularOpeningHour.OpeningTime);
                string closingTime = FormatTime(regularOpeningHour.ClosingTime);
                timeDisplay = (openingTime == "00" && closingTime == "00")
                    ? "Closed"
                    : $"{openingTime}–{closingTime}";
            }
        }

        weekDays.Add(new OpeningHourDayDto
        {
            Date = date.ToString("dd.MM."),
            Day = date.ToString("ddd", CultureInfo.InvariantCulture),
            OpeningTime = timeDisplay,
            ClosingTime = "", // You can split timeDisplay if needed
            // Optionally add: IsToday = isToday
        });
    }

    return new OpeningHourWeekDto
    {
        WeekNumber = weekNumber,
        Days = weekDays
    };
   

  }

  /// <inheritdoc />
  public async Task<LibraryOpenStatusDto> GetLibraryOpenStatusAsync()
  {
    DateTime now = DateTime.UtcNow;
    var timeZoneId = "Europe/Helsinki"; // hard coded for now
    var timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
    var localNow = TimeZoneInfo.ConvertTimeFromUtc(now, timeZone);
    int weekNumber = GetWeekNumber(localNow, timeZoneId);
    int dayOfWeek = ((int)localNow.DayOfWeek + 6) % 7; // Monday=0, ..., Sunday=6

    var holidayWeeks = await _context.HolidayWeeks.ToListAsync();
    var openingHours = await _context.OpeningHours.ToListAsync();

    // Find holiday week if exists
    var holidayWeek = holidayWeeks.FirstOrDefault(hw => hw.WeekNumber == weekNumber);

    OpeningHourType openingHourType = holidayWeek != null
        ? GetOpeningHourTypeFromHolidayWeek(holidayWeek, dayOfWeek)
        : GetRegularWeekOpeningHourType(dayOfWeek);

    WeekType weekType = holidayWeek != null ? WeekType.PublicHolidayWeek : WeekType.RegularWeek;
    var openingHour = openingHours.FirstOrDefault(oh => oh.OpeningHourType == openingHourType && oh.WeekType == weekType);

    if (openingHour == null)
    {
        throw new InvalidOperationException("Opening hours not available for the requested day.");
    }

    string openingTime = FormatTime(openingHour.OpeningTime);
    string closingTime = FormatTime(openingHour.ClosingTime);

    // Closed all day
    if (openingTime == "00" && closingTime == "00")
    {
      return new LibraryOpenStatusDto { IsOpen = false, StatusText = "Closed" };
    }

    bool isWithinHours = IsCurrentTimeWithinHours(openingHour.OpeningTime, openingHour.ClosingTime, localNow);
    
    return new LibraryOpenStatusDto { IsOpen = isWithinHours, StatusText = $" {openingTime} – {closingTime}" };
  }


  #region Private Methods

  /// <summary>
  /// Gets the opening hour type for a regular week based on the day of the week.
  /// </summary>
  /// <param name="dayOfWeek">The day of the week (0 = Monday, 6 = Sunday).</param>
  /// <returns>The opening hour type.</returns>
  private OpeningHourType GetRegularWeekOpeningHourType(int dayOfWeek)
  {
    switch (dayOfWeek)
    {
      case 0:
      case 1:
      case 2:
      case 3:
        return OpeningHourType.Workday;
      case 4:
        return OpeningHourType.Friday;
      case 5:
        return OpeningHourType.Saturday;
      case 6:
        return OpeningHourType.Sunday;
      default:
        return OpeningHourType.Sunday;
    }
  }  

  /// <summary>
  /// Formats the time to a string representation.
  /// </summary>
  /// <param name="time">The time to format.</param>
  /// <returns>The formatted time string.</returns>
  private string FormatTime(TimeOnly time)
  {
    return time.Hour.ToString("D2");
  }


  /// <summary>
  /// Parses the time to an integer representing the hour.
  /// </summary>
  /// <param name="time">The time to parse.</param>
  /// <returns>The hour as an integer.</returns>  
  private int ParseTime(TimeOnly time)
  {
    return time.Hour;
  }


  /// <summary>
  /// Checks if the current time is within the opening hours.
  /// </summary>
  /// <param name="openingTime">The opening time.</param>
  /// <param name="closingTime">The closing time.</param>
  /// <param name="currentTime">The current time.</param>
  /// <returns>True if the current time is within the opening hours; otherwise, false.</returns>
  private bool IsCurrentTimeWithinHours(TimeOnly openingTime, TimeOnly closingTime, DateTime currentTime)
  {
    int openingHour = ParseTime(openingTime);
    int closingHour = ParseTime(closingTime);
    int currentHour = currentTime.Hour;
    if (closingHour == 0)
      return false;
    return currentHour >= openingHour && currentHour < closingHour;
  }


  /// <summary>
  /// Gets the opening hour type based on the holiday week and day of the week.
  /// </summary>
  /// <param name="holidayWeek">The holiday week.</param>
  /// <param name="dayOfWeek">The day of the week.</param>
  /// <returns>The opening hour type.</returns>
  private OpeningHourType GetOpeningHourTypeFromHolidayWeek(HolidayWeek holidayWeek, int dayOfWeek)
  {
    return dayOfWeek switch
    {
      0 => holidayWeek.Monday,
      1 => holidayWeek.Tuesday,
      2 => holidayWeek.Wednesday,
      3 => holidayWeek.Thursday,
      4 => holidayWeek.Friday,
      5 => holidayWeek.Saturday,
      6 => holidayWeek.Sunday,
      _ => holidayWeek.Sunday
    };
  }

  /// <summary>
  /// Calculates the week number for a given date in a specified time zone.
  /// Uses ISO 8601 week rules (first week with at least 4 days, Monday as first day).
  /// </summary>
  /// <param name="dateUtc">The date in UTC.</param>
  /// <param name="timeZoneId">The ID of the time zone.</param>
  /// <returns>The week number.</returns>
  private int GetWeekNumber(DateTime dateUtc, string timeZoneId)
  {
    // Convert UTC date to user's local time
    var timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
    var localDate = TimeZoneInfo.ConvertTimeFromUtc(dateUtc, timeZone);

    // Use ISO 8601 week rules (first week with at least 4 days, Monday as first day)
    var calendar = CultureInfo.InvariantCulture.Calendar;
    var weekRule = CalendarWeekRule.FirstFourDayWeek;
    var firstDayOfWeek = DayOfWeek.Monday;

    return calendar.GetWeekOfYear(localDate, weekRule, firstDayOfWeek);
  }
 
  #endregion Private Methods
}
