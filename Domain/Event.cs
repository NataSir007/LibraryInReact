using System;
using System.Collections.Generic;

namespace Domain;

public class Event
{
    public int Id { get; set; }
    public int LibraryId { get; set; }
    public required Library Library { get; set; } = null!;
    public required string Name { get; set; } = null!;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? MeetingUrl { get; set; } = null;
    public int? EventSeriesId { get; set; }
    public EventSeries? EventSeries { get; set; }

    public ICollection<EventTranslation> Translations { get; set; } = new List<EventTranslation>();
    public ICollection<EventTag> EventTags { get; set; } = new List<EventTag>();
}