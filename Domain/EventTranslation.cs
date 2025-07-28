using System.ComponentModel.DataAnnotations;

namespace Domain;

public class EventTranslation
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; } = null!;
    [MaxLength(2)]  //// Language code in ISO 639-1 format (e.g., "en", "fr")
    public required string Language { get; set; } = null!;
    [MaxLength(256)]
    public required string Admission { get; set; } = null!;
    [MaxLength(256)]
    public required string Title { get; set; } = null!;
    [MaxLength(2048)]
    public required string Description { get; set; } = null!;
}