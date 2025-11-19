using Domain;

namespace LibraryInReact.API.Controllers.Services.Authentication;

/// <summary>
/// Service interface for JWT token operations.
/// </summary>
public interface IJwtService
{
    /// <summary>
    /// Generates JWT token for user.
    /// </summary>
    /// <param name="user">User to generate token for</param>
    /// <returns>JWT token string</returns>
    string GenerateToken(User user);

    /// <summary>
    /// Validates JWT token and extracts user information.
    /// </summary>
    /// <param name="token">JWT token to validate</param>
    /// <returns>User ID if token is valid, null otherwise</returns>
    int? ValidateToken(string token);

    /// <summary>
    /// Extracts user ID from JWT token without validation.
    /// </summary>
    /// <param name="token">JWT token</param>
    /// <returns>User ID if found, null otherwise</returns>
    int? GetUserIdFromToken(string token);
}