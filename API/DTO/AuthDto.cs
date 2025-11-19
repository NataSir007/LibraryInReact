using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace API.DTO;

/// <summary>
/// DTO for library card login request.
/// </summary>
public class LibraryCardLoginDto
{
    [Required]
    [StringLength(20, MinimumLength = 1)]
    public required string CardNumber { get; set; }

    [Required]
    [StringLength(10, MinimumLength = 4)]
    public required string Pin { get; set; }
}

/// <summary>
/// DTO for BankID login request.
/// </summary>
public class BankIdLoginDto
{
    [Required]
    [StringLength(12, MinimumLength = 10)]
    public required string PersonalNumber { get; set; }
}

/// <summary>
/// DTO for authentication response.
/// </summary>
public class AuthResponseDto
{
    public required string Token { get; set; }
    public required UserProfileDto User { get; set; }
    public DateTime ExpiresAt { get; set; }
}

/// <summary>
/// DTO for user profile information.
/// </summary>
public class UserProfileDto
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Address { get; set; }
    public string? PostalCode { get; set; }
    public string? City { get; set; }
    public string? Phone { get; set; }
    public string? SmsNumber { get; set; }
    public UserStatus Status { get; set; }
    public NotificationType NotificationPreference { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public decimal TotalDebt { get; set; }
    public List<LibraryCardDto> LibraryCards { get; set; } = new();
}

/// <summary>
/// DTO for library card information.
/// </summary>
public class LibraryCardDto
{
    public int Id { get; set; }
    public required string CardNumber { get; set; }
    public LibraryCardStatus Status { get; set; } // Active, TemporarilyBlocked, Cancelled
    public DateTime IssuedAt { get; set; }
    public DateTime? BlockedAt { get; set; }
    public string? BlockReason { get; set; }
}

/// <summary>
/// DTO for updating user profile.
/// </summary>
public class UpdateUserProfileDto
{
    [StringLength(64, MinimumLength = 1)]
    public string? FirstName { get; set; }

    [StringLength(64, MinimumLength = 1)]
    public string? LastName { get; set; }

    [StringLength(128)]
    public string? Address { get; set; }

    [StringLength(10)]
    public string? PostalCode { get; set; }

    [StringLength(64)]
    public string? City { get; set; }

    [StringLength(24)]
    public string? Phone { get; set; }

    [StringLength(24)]
    public string? SmsNumber { get; set; }

    public NotificationType? NotificationPreference { get; set; }
}

/// <summary>
/// DTO for changing library card PIN.
/// </summary>
public class ChangePinDto
{
    [Required]
    [StringLength(10, MinimumLength = 4)]
    public required string CurrentPin { get; set; }

    [Required]
    [StringLength(10, MinimumLength = 4)]
    public required string NewPin { get; set; }
}