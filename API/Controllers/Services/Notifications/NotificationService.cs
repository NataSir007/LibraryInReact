using Domain;
using Domain.Enums;

namespace LibraryInReact.API.Controllers.Services.Notifications;

/// <summary>
/// Implementation of INotificationService for notification operations.
/// </summary>
public class NotificationService : INotificationService
{
    private readonly ILogger<NotificationService> _logger;

    public NotificationService(ILogger<NotificationService> logger)
    {
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task SendDebtWarningAsync(User user, decimal totalDebt)
    {
        var subject = "Library Debt Warning";
        var message = $"Dear {user.FirstName},\n\n" +
                     $"Your current library debt is €{totalDebt:F2}. " +
                     $"Please pay your outstanding debts to avoid card suspension.\n\n" +
                     $"If your debt exceeds €25.00, your library card will be temporarily blocked.\n\n" +
                     $"Best regards,\nLibrary Service";

        await SendNotificationAsync(user, subject, message);
    }

    /// <inheritdoc />
    public async Task SendCardBlockingNotificationAsync(User user, string reason)
    {
        var subject = "Library Card Blocked";
        var message = $"Dear {user.FirstName},\n\n" +
                     $"Your library card has been temporarily blocked.\n\n" +
                     $"Reason: {reason}\n\n" +
                     $"To reactivate your card, please pay your outstanding debts through the library system.\n\n" +
                     $"Best regards,\nLibrary Service";

        await SendNotificationAsync(user, subject, message);
    }

    /// <inheritdoc />
    public async Task SendCardReactivationNotificationAsync(User user)
    {
        var subject = "Library Card Reactivated";
        var message = $"Dear {user.FirstName},\n\n" +
                     $"Good news! Your library card has been reactivated.\n\n" +
                     $"Thank you for settling your outstanding debts. You can now use your library card normally.\n\n" +
                     $"Best regards,\nLibrary Service";

        await SendNotificationAsync(user, subject, message);
    }

    /// <inheritdoc />
    public async Task SendEmailAsync(string email, string subject, string body)
    {
        try
        {
            // Mock email implementation - replace with actual email service (SendGrid, SMTP, etc.)
            _logger.LogInformation("Sending email to {Email}\nSubject: {Subject}\nBody: {Body}", 
                email, subject, body);
            
            // Simulate async email sending
            await Task.Delay(100);
            
            _logger.LogInformation("Email sent successfully to {Email}", email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email to {Email}", email);
        }
    }

    /// <inheritdoc />
    public async Task SendSmsAsync(string phoneNumber, string message)
    {
        try
        {
            // Mock SMS implementation - replace with actual SMS service (Twilio, etc.)
            _logger.LogInformation("Sending SMS to {PhoneNumber}\nMessage: {Message}", 
                phoneNumber, message);
            
            // Simulate async SMS sending
            await Task.Delay(100);
            
            _logger.LogInformation("SMS sent successfully to {PhoneNumber}", phoneNumber);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending SMS to {PhoneNumber}", phoneNumber);
        }
    }

    /// <inheritdoc />
    public async Task SendNotificationAsync(User user, string subject, string message)
    {
        try
        {
            switch (user.NotificationPreference)
            {
                case NotificationType.Email:
                    if (!string.IsNullOrEmpty(user.Email))
                    {
                        await SendEmailAsync(user.Email, subject, message);
                    }
                    break;

                case NotificationType.Sms:
                    if (!string.IsNullOrEmpty(user.SmsNumber))
                    {
                        // For SMS, send shorter message
                        var smsMessage = $"{subject}: {message.Substring(0, Math.Min(message.Length, 160))}";
                        await SendSmsAsync(user.SmsNumber, smsMessage);
                    }
                    break;

                case NotificationType.EmailAndSms:
                    if (!string.IsNullOrEmpty(user.Email))
                    {
                        await SendEmailAsync(user.Email, subject, message);
                    }
                    if (!string.IsNullOrEmpty(user.SmsNumber))
                    {
                        var smsMessage = $"{subject}: {message.Substring(0, Math.Min(message.Length, 160))}";
                        await SendSmsAsync(user.SmsNumber, smsMessage);
                    }
                    break;
            }

            _logger.LogInformation("Notification sent to user {UserId} via {NotificationPreference}", 
                user.Id, user.NotificationPreference);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending notification to user {UserId}", user.Id);
        }
    }
}