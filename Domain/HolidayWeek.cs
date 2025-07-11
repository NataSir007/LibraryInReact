using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain;
public class HolidayWeek
{
    public int Id { get; set; }

    [Required]
    [Range(1, 53, ErrorMessage = "WeekNumber must be between 1 and 53")]
    public int WeekNumber { get; set; }

    [Required]
    public OpeningHourType Monday { get; set; }

    [Required]
    public OpeningHourType Tuesday { get; set; }

    [Required]
    public OpeningHourType Wednesday { get; set; }

    [Required]
    public OpeningHourType Thursday { get; set; }

    [Required]
    public OpeningHourType Friday { get; set; }

    [Required]
    public OpeningHourType Saturday { get; set; }

    [Required]
    public OpeningHourType Sunday { get; set; }
}
