using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Event
{
    public int Id { get; set; }
    public required int LibraryId { get; set; }
    public Library Library { get; set; } = null!;    
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? MeetingUrl { get; set; } = null;
    public int? EventSeriesId { get; set; }
    public EventImage? EventImage { get; set; } = null;

    public ICollection<EventTranslation> Translations { get; set; } = new List<EventTranslation>();
    public ICollection<EventTag> EventTags { get; set; } = new List<EventTag>();
}