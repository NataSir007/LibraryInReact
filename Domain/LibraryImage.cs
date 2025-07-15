using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Domain;

public class LibraryImage
{
    public int Id { get; set; }
    
    [Required]
    public int LibraryId { get; set; }
    
    public required ImageType ImageType { get; set; } // Main, Exterior, Interior, Thumbnail
    
    [MaxLength(255)]
    public required string FileName { get; set; } // 'library-maunula-main.jpg'
    
    [MaxLength(500)]
    public required string FilePath { get; set; } // '/uploads/libraries/library-maunula-main.jpg'
    
    [MaxLength(255)]
    public required string AltText { get; set; } // For accessibility
    
    // Navigation property
    [JsonIgnore]
    public Library? Library { get; set; }
}
