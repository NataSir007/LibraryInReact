using Domain;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace LibraryInReact.API.Controllers.Services.Users;

/// <summary>
/// Implementation of IUserService for user management operations.
/// </summary>
public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly ILogger<UserService> _logger;

    public UserService(AppDbContext context, ILogger<UserService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task<User?> GetUserByIdAsync(int userId)
    {
        try
        {
            return await _context.Users
                .Include(u => u.LibraryCards)
                .Include(u => u.DebtRecords.Where(d => d.Status == DebtStatus.Pending))
                .FirstOrDefaultAsync(u => u.Id == userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving user by ID: {UserId}", userId);
            return null;
        }
    }

    /// <inheritdoc />
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        try
        {
            return await _context.Users
                .Include(u => u.LibraryCards)
                .FirstOrDefaultAsync(u => u.Email == email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving user by email: {Email}", email);
            return null;
        }
    }

    /// <inheritdoc />
    public async Task<User> UpdateUserAsync(User user)
    {
        try
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user: {UserId}", user.Id);
            throw;
        }
    }

    /// <inheritdoc />
    public async Task UpdateNotificationPreferenceAsync(int userId, NotificationType notificationType)
    {
        try
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.NotificationPreference = notificationType;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Updated notification preference for user {UserId} to {NotificationType}", 
                    userId, notificationType);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating notification preference for user: {UserId}", userId);
            throw;
        }
    }

    /// <inheritdoc />
    public async Task<bool> IsUserActiveAsync(int userId)
    {
        try
        {
            var user = await _context.Users.FindAsync(userId);
            return user?.Status == UserStatus.Active;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking user active status: {UserId}", userId);
            return false;
        }
    }
}