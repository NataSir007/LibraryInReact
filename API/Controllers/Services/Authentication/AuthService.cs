using Domain;
using Domain.Enums;
using LibraryInReact.API.Controllers.Services.Users;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace LibraryInReact.API.Controllers.Services.Authentication;

/// <summary>
/// Implementation of IAuthService for authentication operations.
/// </summary>
public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwtService;
    private readonly ILibraryCardService _libraryCardService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        AppDbContext context,
        IJwtService jwtService,
        ILibraryCardService libraryCardService,
        ILogger<AuthService> logger)
    {
        _context = context;
        _jwtService = jwtService;
        _libraryCardService = libraryCardService;
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task<User?> AuthenticateWithLibraryCardAsync(string cardNumber, string pin)
    {
        try
        {
            var libraryCard = await _libraryCardService.GetLibraryCardByNumberAsync(cardNumber);
            
            if (libraryCard == null)
            {
                _logger.LogWarning("Library card not found: {CardNumber}", cardNumber);
                return null;
            }

            // Check if card is blocked
            if (libraryCard.Status != LibraryCardStatus.Active)
            {
                _logger.LogWarning("Blocked library card authentication attempt: {CardNumber}, Status: {Status}", 
                    cardNumber, libraryCard.Status);
                return null;
            }

            // Validate PIN
            var isPinValid = await _libraryCardService.ValidatePinAsync(libraryCard.Id, pin);
            
            if (!isPinValid)
            {
                await _libraryCardService.RecordFailedPinAttemptAsync(libraryCard.Id);
                _logger.LogWarning("Invalid PIN attempt for card: {CardNumber}", cardNumber);
                return null;
            }

            // Reset failed attempts on successful login
            await _libraryCardService.ResetFailedPinAttemptsAsync(libraryCard.Id);

            // Get user with related data
            var user = await _context.Users
                .Include(u => u.LibraryCards)
                .FirstOrDefaultAsync(u => u.Id == libraryCard.UserId);

            if (user == null || user.Status != UserStatus.Active)
            {
                _logger.LogWarning("Inactive user authentication attempt: {UserId}", libraryCard.UserId);
                return null;
            }

            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during library card authentication for card: {CardNumber}", cardNumber);
            return null;
        }
    }

    /// <inheritdoc />
    public async Task<User?> AuthenticateWithBankIdAsync(string personalNumber)
    {
        try
        {
            // Mock BankID implementation - in production, integrate with actual BankID service
            // For now, find user by email if personal number matches pattern
            if (string.IsNullOrEmpty(personalNumber) || personalNumber.Length < 10)
            {
                _logger.LogWarning("Invalid personal number format: {PersonalNumber}", personalNumber);
                return null;
            }

            // Mock: Find user by email pattern (replace with actual BankID integration)
            var mockEmail = $"user{personalNumber}@example.com";
            var user = await _context.Users
                .Include(u => u.LibraryCards)
                .FirstOrDefaultAsync(u => u.Email == mockEmail && u.Status == UserStatus.Active);

            if (user == null)
            {
                _logger.LogWarning("BankID user not found: {PersonalNumber}", personalNumber);
                return null;
            }

            _logger.LogInformation("Successful BankID authentication: {UserId}", user.Id);
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during BankID authentication: {PersonalNumber}", personalNumber);
            return null;
        }
    }

    /// <inheritdoc />
    public async Task<string> GenerateJwtTokenAsync(User user)
    {
        await UpdateLastLoginAsync(user.Id);
        return _jwtService.GenerateToken(user);
    }

    /// <inheritdoc />
    public async Task UpdateLastLoginAsync(int userId)
    {
        try
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.LastLoginAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating last login for user: {UserId}", userId);
        }
    }
}