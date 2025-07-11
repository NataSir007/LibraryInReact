using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain;

public class LibraryOpeningHours
{
    public int Id { get; set; }
    
    [Required]
    public int LibraryId { get; set; }

    public OpeningHourType OpeningHourType { get; set; }

    [Required]
    public TimeOnly OpeningTime { get; set; }

    [Required]
    public TimeOnly ClosingTime { get; set; }

    [Required]
    public WeekType WeekType { get; set; }
    
    // Navigation property
    public Library Library { get; set; } = null!;
}
