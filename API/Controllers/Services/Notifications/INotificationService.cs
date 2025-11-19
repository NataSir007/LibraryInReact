using Domain;
using Domain.Enums;

namespace LibraryInReact.API.Controllers.Services.Notifications;

/// <summary>
/// Service interface for notification operations.
/// </summary>
public interface INotificationService
{
    /// <summary>
    /// Sends debt warning notification to user.
    /// </summary>
    /// <param name="user">User to notify</param>
    /// <param name="totalDebt">Current debt amount</param>
    Task SendDebtWarningAsync(User user, decimal totalDebt);

    /// <summary>
    /// Sends card blocking notification to user.
    /// </summary>
    /// <param name="user">User to notify</param>
    /// <param name="reason">Reason for blocking</param>
    Task SendCardBlockingNotificationAsync(User user, string reason);

    /// <summary>
    /// Sends card reactivation notification to user.
    /// </summary>
    /// <param name="user">User to notify</param>
    Task SendCardReactivationNotificationAsync(User user);

    /// <summary>
    /// Sends email notification.
    /// </summary>
    /// <param name="email">Recipient email</param>
    /// <param name="subject">Email subject</param>
    /// <param name="body">Email body</param>
    Task SendEmailAsync(string email, string subject, string body);

    /// <summary>
    /// Sends SMS notification.
    /// </summary>
    /// <param name="phoneNumber">Recipient phone number</param>
    /// <param name="message">SMS message</param>
    Task SendSmsAsync(string phoneNumber, string message);

    /// <summary>
    /// Sends notification based on user preference.
    /// </summary>
    /// <param name="user">User to notify</param>
    /// <param name="subject">Notification subject</param>
    /// <param name="message">Notification message</param>
    Task SendNotificationAsync(User user, string subject, string message);
}