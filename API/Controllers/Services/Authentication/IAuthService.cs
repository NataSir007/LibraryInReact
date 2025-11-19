using Domain;

namespace LibraryInReact.API.Controllers.Services.Authentication;

/// <summary>
/// Service interface for authentication operations.
/// </summary>
public interface IAuthService
{
    /// <summary>
    /// Authenticates user with library card credentials.
    /// </summary>
    /// <param name="cardNumber">Library card number</param>
    /// <param name="pin">PIN code</param>
    /// <returns>User if authentication successful, null otherwise</returns>
    Task<User?> AuthenticateWithLibraryCardAsync(string cardNumber, string pin);

    /// <summary>
    /// Authenticates user with BankID (mock implementation initially).
    /// </summary>
    /// <param name="personalNumber">Personal identification number</param>
    /// <returns>User if authentication successful, null otherwise</returns>
    Task<User?> AuthenticateWithBankIdAsync(string personalNumber);

    /// <summary>
    /// Generates JWT token for authenticated user.
    /// </summary>
    /// <param name="user">Authenticated user</param>
    /// <returns>JWT token string</returns>
    Task<string> GenerateJwtTokenAsync(User user);

    /// <summary>
    /// Updates user's last login timestamp.
    /// </summary>
    /// <param name="userId">User ID</param>
    Task UpdateLastLoginAsync(int userId);
}