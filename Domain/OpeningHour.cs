using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain;

public class OpeningHour
{
    public int Id { get; set; }   
    
    public OpeningHourType OpeningHourType { get; set; }

    [Required]
    public TimeOnly OpeningTime { get; set; }

    [Required]
    public TimeOnly ClosingTime { get; set; }

    [Required]
    public WeekType WeekType { get; set; }
}
