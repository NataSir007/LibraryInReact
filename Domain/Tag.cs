using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Tag
{
  public int Id { get; set; }
  [MaxLength(64)]
  public required string Name { get; set; } = null!;
  public ICollection<EventTag> EventTags { get; set; } = new List<EventTag>();
    
}