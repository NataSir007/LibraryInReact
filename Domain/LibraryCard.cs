using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Domain;

public class LibraryCard
{
    public int Id { get; set; }

    [Required]
    public required int UserId { get; set; }


    [Required]
    [MaxLength(20)]
    public required string CardNumber { get; set; }

    [Required]
    [MaxLength(256)]
    public required string PinHash { get; set; }

    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;

    public DateTime? ExpiresAt { get; set; }

    public LibraryCardStatus Status { get; set; } = LibraryCardStatus.Active;

    public DateTime? BlockedAt { get; set; }

    [MaxLength(500)]
    public string? BlockReason { get; set; }

    public int FailedPinAttempts { get; set; } = 0;

    public DateTime? LastFailedPinAttempt { get; set; }

    // Navigation properties
    [JsonIgnore]
    public User User { get; set; } = null!;
    
    // Removed Library navigation property; card is valid in all libraries
    
    public ICollection<DebtRecord> DebtRecords { get; set; } = new List<DebtRecord>();
}