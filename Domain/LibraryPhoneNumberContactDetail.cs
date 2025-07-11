using System.ComponentModel.DataAnnotations;

namespace Domain;
public class LibraryPhoneNumberContactDetail
{
    public int Id { get; set; }
    
    [Required]
    public int LibraryId { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string ServiceName { get; set; } = null!;
    
    [MaxLength(64)]
    public string? ContactName { get; set; }
    
    [Required]
    [MaxLength(24)]
    public string ContactPhoneNumber { get; set; } = null!;
    
    // Navigation property
    public Library Library { get; set; } = null!;
}
