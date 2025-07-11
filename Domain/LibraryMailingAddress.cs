using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Domain;

public class LibraryMailingAddress
{
    public int Id { get; set; }

    [Required]
    public int LibraryId { get; set; }
    
    [Required]
    [MaxLength(10)]
    public string PostOfficeBox { get; set; } = null!;
    
    [Required]
    [MaxLength(10)]
    public string PostalCode { get; set; } = null!;
    
    [Required]
    public LocationType LocationType { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string LocationName { get; set; } = null!;
    
    // Navigation property
    public Library Library { get; set; } = null!;
}
