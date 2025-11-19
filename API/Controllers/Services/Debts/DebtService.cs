using Domain;
using Domain.Enums;
using LibraryInReact.API.Controllers.Services.Notifications;
using LibraryInReact.API.Controllers.Services.Users;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace LibraryInReact.API.Controllers.Services.Debts;

/// <summary>
/// Implementation of IDebtService for debt management operations.
/// </summary>
public class DebtService : IDebtService
{
    private readonly AppDbContext _context;
    private readonly INotificationService _notificationService;
    private readonly ILibraryCardService _libraryCardService;
    private readonly ILogger<DebtService> _logger;
    private const decimal DebtThreshold = 25.0m; // €25 threshold for blocking

    public DebtService(
        AppDbContext context,
        INotificationService notificationService,
        ILibraryCardService libraryCardService,
        ILogger<DebtService> logger)
    {
        _context = context;
        _notificationService = notificationService;
        _libraryCardService = libraryCardService;
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task<decimal> GetTotalDebtAsync(int userId)
    {
        try
        {
            return await _context.DebtRecords
                .Where(d => d.UserId == userId && d.Status == DebtStatus.Pending)
                .SumAsync(d => d.Amount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calculating total debt for user: {UserId}", userId);
            return 0;
        }
    }

    /// <inheritdoc />
    public async Task<List<DebtRecord>> GetUserDebtsAsync(int userId)
    {
        try
        {
            return await _context.DebtRecords
                .Include(d => d.LibraryCard)
                .Where(d => d.UserId == userId)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving debts for user: {UserId}", userId);
            return new List<DebtRecord>();
        }
    }

    /// <inheritdoc />
    public async Task<List<DebtRecord>> GetCardDebtsAsync(int libraryCardId)
    {
        try
        {
            return await _context.DebtRecords
                .Where(d => d.LibraryCardId == libraryCardId && d.Status == DebtStatus.Pending)
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving debts for library card: {CardId}", libraryCardId);
            return new List<DebtRecord>();
        }
    }

    /// <inheritdoc />
    public async Task<DebtRecord> CreateDebtAsync(DebtRecord debt)
    {
        try
        {
            _context.DebtRecords.Add(debt);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Debt created: {DebtId}, User: {UserId}, Amount: {Amount}", 
                debt.Id, debt.UserId, debt.Amount);

            // Check if debt creation triggers blocking
            await ProcessAutomaticBlockingAsync(debt.UserId);

            return debt;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating debt for user: {UserId}", debt.UserId);
            throw;
        }
    }

    /// <inheritdoc />
    public async Task<DebtRecord> MarkDebtAsPaidAsync(int debtId)
    {
        try
        {
            var debt = await _context.DebtRecords.FindAsync(debtId);
            if (debt == null)
            {
                throw new ArgumentException($"Debt not found: {debtId}");
            }

            debt.Status = DebtStatus.Paid;
            debt.PaidAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            _logger.LogInformation("Debt marked as paid: {DebtId}, User: {UserId}, Amount: {Amount}", 
                debtId, debt.UserId, debt.Amount);

            // Check if payment allows card reactivation
            await ProcessCardReactivationAsync(debt.UserId);

            return debt;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error marking debt as paid: {DebtId}", debtId);
            throw;
        }
    }

    /// <inheritdoc />
    public async Task<bool> IsDebtAboveThresholdAsync(int userId)
    {
        var totalDebt = await GetTotalDebtAsync(userId);
        return totalDebt > DebtThreshold;
    }

    /// <inheritdoc />
    public async Task ProcessAutomaticBlockingAsync(int userId)
    {
        try
        {
            var totalDebt = await GetTotalDebtAsync(userId);
            
            if (totalDebt > DebtThreshold)
            {
                var user = await _context.Users
                    .Include(u => u.LibraryCards)
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    // Send warning notification before blocking
                    await _notificationService.SendDebtWarningAsync(user, totalDebt);

                    // Block all active library cards
                    var activeCards = user.LibraryCards
                        .Where(lc => lc.Status == LibraryCardStatus.Active)
                        .ToList();

                    foreach (var card in activeCards)
                    {
                        await _libraryCardService.BlockCardTemporarilyAsync(
                            card.Id, 
                            $"Debt exceeds threshold: €{totalDebt:F2}");
                        
                        await _notificationService.SendCardBlockingNotificationAsync(
                            user, 
                            $"Your library card has been temporarily blocked due to outstanding debt of €{totalDebt:F2}. Please pay your debts to reactivate your card.");
                    }

                    _logger.LogWarning("User cards blocked due to debt: {UserId}, Total debt: {TotalDebt}", 
                        userId, totalDebt);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing automatic blocking for user: {UserId}", userId);
        }
    }

    /// <inheritdoc />
    public async Task ProcessCardReactivationAsync(int userId)
    {
        try
        {
            var totalDebt = await GetTotalDebtAsync(userId);
            
            if (totalDebt <= DebtThreshold)
            {
                var user = await _context.Users
                    .Include(u => u.LibraryCards)
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user != null)
                {
                    // Reactivate temporarily blocked cards
                    var blockedCards = user.LibraryCards
                        .Where(lc => lc.Status == LibraryCardStatus.TemporarilyBlocked)
                        .ToList();

                    foreach (var card in blockedCards)
                    {
                        await _libraryCardService.ReactivateCardAsync(card.Id);
                    }

                    if (blockedCards.Any())
                    {
                        await _notificationService.SendCardReactivationNotificationAsync(user);
                        
                        _logger.LogInformation("User cards reactivated after debt payment: {UserId}, Remaining debt: {RemainingDebt}", 
                            userId, totalDebt);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing card reactivation for user: {UserId}", userId);
        }
    }
}