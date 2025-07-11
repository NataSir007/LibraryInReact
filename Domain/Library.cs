using System.ComponentModel.DataAnnotations;

namespace Domain;

public class Library
{
    public int Id { get; set; }

    [MaxLength(128)]
    public required string Name { get; set; }

    // Address contains street name, building number, postal code and city

    [MaxLength(128)]
    public required string Address { get; set; }


    [MaxLength(256)]
    public required string Homepage { get; set; }


    [MaxLength(256)]
    public required string FacebookUrl { get; set; }

    [MaxLength(1024)]
    public string? Notes { get; set; }
    
    // navigation properties
    public ICollection<LibraryEmailContactDetail> LibraryEmailContactDetails { get; set; } = new List<LibraryEmailContactDetail>();
    public ICollection<LibraryPhoneNumberContactDetail> LibraryPhoneNumberContactDetails { get; set; } = new List<LibraryPhoneNumberContactDetail>();
    public ICollection<LibraryMailingAddress> LibraryMailingAddresses { get; set; } = new List<LibraryMailingAddress>();
}
