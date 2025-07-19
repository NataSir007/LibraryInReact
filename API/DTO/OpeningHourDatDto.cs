/// <summary>
/// Represents opening hours for a single day.
/// </summary>
public class OpeningHourDayDto
{
    public required string Date { get; set; } // consists of day and month "18.07."
    public required string Day { get; set; } // e.g. "Mon - abbreviation"
    public required string OpeningTime { get; set; } // e.g. "09"
    public required string ClosingTime { get; set; } // e.g. "17"
}

/// <summary>
/// Represents opening hours for a week, including week number and a list of 7 days.
/// </summary>
public class OpeningHourWeekDto
{
    public int WeekNumber { get; set; }
    public List<OpeningHourDayDto> Days { get; set; } = new();
}
