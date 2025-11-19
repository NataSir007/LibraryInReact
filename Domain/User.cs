using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Domain;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public required string Email { get; set; }

    [Required]
    [MaxLength(256)]
    public required string PasswordHash { get; set; }

    [Required]
    [MaxLength(64)]
    public required string FirstName { get; set; }

    [Required]
    [MaxLength(64)]
    public required string LastName { get; set; }

    [MaxLength(128)]
    public string? Address { get; set; }

    [MaxLength(10)]
    public string? PostalCode { get; set; }

    [MaxLength(64)]
    public string? City { get; set; }

    [MaxLength(24)]
    public string? Phone { get; set; }

    [MaxLength(24)]
    public string? SmsNumber { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? LastLoginAt { get; set; }

    public UserStatus Status { get; set; } = UserStatus.Active;

    public NotificationType NotificationPreference { get; set; } = NotificationType.Email;

    // Navigation properties
    
    public ICollection<LibraryCard> LibraryCards { get; set; } = new List<LibraryCard>();
    
    public ICollection<DebtRecord> DebtRecords { get; set; } = new List<DebtRecord>();
}