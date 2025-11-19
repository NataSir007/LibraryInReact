using Domain;

namespace LibraryInReact.API.Controllers.Services.Users;

/// <summary>
/// Service interface for user management operations.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Gets user by ID with related data.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>User if found, null otherwise</returns>
    Task<User?> GetUserByIdAsync(int userId);

    /// <summary>
    /// Gets user by email address.
    /// </summary>
    /// <param name="email">Email address</param>
    /// <returns>User if found, null otherwise</returns>
    Task<User?> GetUserByEmailAsync(string email);

    /// <summary>
    /// Updates user profile information.
    /// </summary>
    /// <param name="user">User with updated information</param>
    /// <returns>Updated user</returns>
    Task<User> UpdateUserAsync(User user);

    /// <summary>
    /// Updates user's notification preferences.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <param name="notificationType">Preferred notification type</param>
    Task UpdateNotificationPreferenceAsync(int userId, Domain.Enums.NotificationType notificationType);

    /// <summary>
    /// Checks if user account is active and not blocked.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>True if user can access system, false otherwise</returns>
    Task<bool> IsUserActiveAsync(int userId);
}