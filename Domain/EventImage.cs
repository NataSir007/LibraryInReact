using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Domain;

public class EventImage
{
    public int Id { get; set; }

    [Required]
    public int EventId { get; set; }


    [MaxLength(255)]
    public required string FileName { get; set; } // 'eventName.jpg'

    [MaxLength(500)]
    public required string FilePath { get; set; } // '/uploads/events/eventName.jpg'

    [MaxLength(255)]
    public required string AltText { get; set; } // For accessibility

    // Navigation property to the Event entity
    [JsonIgnore]
    public Event Event { get; set; } = null!; 

}
