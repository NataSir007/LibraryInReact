using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Domain;

public class DebtRecord
{
    public int Id { get; set; }

    [Required]
    public required int UserId { get; set; }

    [Required]
    public required int LibraryCardId { get; set; }

    // Removed LibraryId and Library navigation property; debts are not tied to a single library

    [Required]
    public required DebtType DescriptionType { get; set; }

    [Required]
    [Column(TypeName = "decimal(10,2)")]
    public required decimal Amount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? DueDate { get; set; }

    public DateTime? PaidAt { get; set; }

    public DebtStatus Status { get; set; } = DebtStatus.Pending;

    public DebtType Type { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; }

    // Navigation properties
    [JsonIgnore]
    public User User { get; set; } = null!;
    
    [JsonIgnore]
    public LibraryCard LibraryCard { get; set; } = null!;   

}