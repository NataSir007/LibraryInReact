using Domain;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace LibraryInReact.API.Controllers.Services.Users;

/// <summary>
/// Implementation of ILibraryCardService for library card management operations.
/// </summary>
public class LibraryCardService : ILibraryCardService
{
    private readonly AppDbContext _context;
    private readonly ILogger<LibraryCardService> _logger;
    private const int MaxFailedPinAttempts = 3;
    private const int PinLockoutMinutes = 30;

    public LibraryCardService(AppDbContext context, ILogger<LibraryCardService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task<LibraryCard?> GetLibraryCardByNumberAsync(string cardNumber)
    {
        try
        {
            return await _context.LibraryCards
                .Include(lc => lc.User)
                .FirstOrDefaultAsync(lc => lc.CardNumber == cardNumber);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving library card: {CardNumber}", cardNumber);
            return null;
        }
    }

    /// <inheritdoc />
    public async Task<List<LibraryCard>> GetUserLibraryCardsAsync(int userId)
    {
        try
        {
            return await _context.LibraryCards
                .Where(lc => lc.UserId == userId)
                .OrderBy(lc => lc.IssuedAt)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving library cards for user: {UserId}", userId);
            return new List<LibraryCard>();
        }
    }

    /// <inheritdoc />
    public async Task<bool> ValidatePinAsync(int cardId, string pin)
    {
        try
        {
            var card = await _context.LibraryCards.FindAsync(cardId);
            if (card == null) return false;

            // Check if card is temporarily locked due to failed attempts
            if (card.FailedPinAttempts >= MaxFailedPinAttempts && 
                card.LastFailedPinAttempt.HasValue && 
                card.LastFailedPinAttempt.Value.AddMinutes(PinLockoutMinutes) > DateTime.UtcNow)
            {
                _logger.LogWarning("PIN validation attempted on locked card: {CardId}", cardId);
                return false;
            }

            // In production, use proper password hashing (BCrypt, Argon2, etc.)
            var pinHash = HashPin(pin);
            return card.PinHash == pinHash;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating PIN for card: {CardId}", cardId);
            return false;
        }
    }

    /// <inheritdoc />
    public async Task<bool> UpdatePinAsync(int cardId, string newPin, string currentPin)
    {
        try
        {
            var card = await _context.LibraryCards.FindAsync(cardId);
            if (card == null) return false;

            // Validate current PIN
            if (!await ValidatePinAsync(cardId, currentPin))
            {
                return false;
            }

            // Update PIN
            card.PinHash = HashPin(newPin);
            await _context.SaveChangesAsync();

            _logger.LogInformation("PIN updated for card: {CardId}", cardId);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating PIN for card: {CardId}", cardId);
            return false;
        }
    }

    /// <inheritdoc />
    public async Task BlockCardTemporarilyAsync(int cardId, string reason)
    {
        try
        {
            var card = await _context.LibraryCards.FindAsync(cardId);
            if (card != null)
            {
                card.Status = LibraryCardStatus.TemporarilyBlocked;
                card.BlockedAt = DateTime.UtcNow;
                card.BlockReason = reason;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Card temporarily blocked: {CardId}, Reason: {Reason}", cardId, reason);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error blocking card temporarily: {CardId}", cardId);
            throw;
        }
    }

    /// <inheritdoc />
    public async Task BlockCardPermanentlyAsync(int cardId, string reason)
    {
        try
        {
            var card = await _context.LibraryCards.FindAsync(cardId);
            if (card != null)
            {
                // Use Cancelled for lost or deactivated cards
                card.Status = LibraryCardStatus.Cancelled;
                card.BlockedAt = DateTime.UtcNow;
                card.BlockReason = reason;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Card cancelled (was permanently blocked): {CardId}, Reason: {Reason}", cardId, reason);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cancelling card: {CardId}", cardId);
            throw;
        }
    }

    /// <inheritdoc />
    public async Task ReactivateCardAsync(int cardId)
    {
        try
        {
            var card = await _context.LibraryCards.FindAsync(cardId);
            if (card != null && card.Status == LibraryCardStatus.TemporarilyBlocked)
            {
                card.Status = LibraryCardStatus.Active;
                card.BlockedAt = null;
                card.BlockReason = null;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Card reactivated: {CardId}", cardId);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reactivating card: {CardId}", cardId);
            throw;
        }
    }

    /// <inheritdoc />
    public async Task RecordFailedPinAttemptAsync(int cardId)
    {
        try
        {
            var card = await _context.LibraryCards.FindAsync(cardId);
            if (card != null)
            {
                card.FailedPinAttempts++;
                card.LastFailedPinAttempt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                _logger.LogWarning("Failed PIN attempt recorded for card: {CardId}, Count: {Count}", 
                    cardId, card.FailedPinAttempts);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error recording failed PIN attempt for card: {CardId}", cardId);
        }
    }

    /// <inheritdoc />
    public async Task ResetFailedPinAttemptsAsync(int cardId)
    {
        try
        {
            var card = await _context.LibraryCards.FindAsync(cardId);
            if (card != null)
            {
                card.FailedPinAttempts = 0;
                card.LastFailedPinAttempt = null;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Failed PIN attempts reset for card: {CardId}", cardId);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resetting failed PIN attempts for card: {CardId}", cardId);
        }
    }

    /// <summary>
    /// Hashes PIN using simple method for demo. Use BCrypt/Argon2 in production.
    /// </summary>
    private static string HashPin(string pin)
    {
        // TODO: Replace with proper password hashing in production
        return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(pin + "salt"));
    }
}