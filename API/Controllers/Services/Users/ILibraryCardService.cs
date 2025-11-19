using Domain;
using Domain.Enums;

namespace LibraryInReact.API.Controllers.Services.Users;

/// <summary>
/// Service interface for library card management operations.
/// </summary>
public interface ILibraryCardService
{
    /// <summary>
    /// Gets library card by card number.
    /// </summary>
    /// <param name="cardNumber">Library card number</param>
    /// <returns>Library card if found, null otherwise</returns>
    Task<LibraryCard?> GetLibraryCardByNumberAsync(string cardNumber);

    /// <summary>
    /// Gets all library cards for a user.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>List of user's library cards</returns>
    Task<List<LibraryCard>> GetUserLibraryCardsAsync(int userId);

    /// <summary>
    /// Validates PIN for library card.
    /// </summary>
    /// <param name="cardId">Library card ID</param>
    /// <param name="pin">PIN to validate</param>
    /// <returns>True if PIN is correct, false otherwise</returns>
    Task<bool> ValidatePinAsync(int cardId, string pin);

    /// <summary>
    /// Updates library card PIN.
    /// </summary>
    /// <param name="cardId">Library card ID</param>
    /// <param name="newPin">New PIN</param>
    /// <param name="currentPin">Current PIN for verification</param>
    /// <returns>True if PIN was updated successfully</returns>
    Task<bool> UpdatePinAsync(int cardId, string newPin, string currentPin);

    /// <summary>
    /// Blocks library card temporarily due to debt.
    /// </summary>
    /// <param name="cardId">Library card ID</param>
    /// <param name="reason">Reason for blocking</param>
    Task BlockCardTemporarilyAsync(int cardId, string reason);

    /// <summary>
    /// Blocks library card permanently (e.g., lost card).
    /// </summary>
    /// <param name="cardId">Library card ID</param>
    /// <param name="reason">Reason for blocking</param>
    Task BlockCardPermanentlyAsync(int cardId, string reason);

    /// <summary>
    /// Reactivates library card after debt payment.
    /// </summary>
    /// <param name="cardId">Library card ID</param>
    Task ReactivateCardAsync(int cardId);

    /// <summary>
    /// Records failed PIN attempt.
    /// </summary>
    /// <param name="cardId">Library card ID</param>
    Task RecordFailedPinAttemptAsync(int cardId);

    /// <summary>
    /// Resets failed PIN attempts counter.
    /// </summary>
    /// <param name="cardId">Library card ID</param>
    Task ResetFailedPinAttemptsAsync(int cardId);
}