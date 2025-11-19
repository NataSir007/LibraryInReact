using Domain;
using Domain.Enums;

namespace LibraryInReact.API.Controllers.Services.Debts;

/// <summary>
/// Service interface for debt management operations.
/// </summary>
public interface IDebtService
{
    /// <summary>
    /// Gets total outstanding debt for a user.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>Total debt amount</returns>
    Task<decimal> GetTotalDebtAsync(int userId);

    /// <summary>
    /// Gets all debt records for a user.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>List of debt records</returns>
    Task<List<DebtRecord>> GetUserDebtsAsync(int userId);

    /// <summary>
    /// Gets pending debt records for a library card.
    /// </summary>
    /// <param name="libraryCardId">Library card ID</param>
    /// <returns>List of pending debt records</returns>
    Task<List<DebtRecord>> GetCardDebtsAsync(int libraryCardId);

    /// <summary>
    /// Creates a new debt record.
    /// </summary>
    /// <param name="debt">Debt record to create</param>
    /// <returns>Created debt record</returns>
    Task<DebtRecord> CreateDebtAsync(DebtRecord debt);

    /// <summary>
    /// Marks debt as paid.
    /// </summary>
    /// <param name="debtId">Debt record ID</param>
    /// <returns>Updated debt record</returns>
    Task<DebtRecord> MarkDebtAsPaidAsync(int debtId);

    /// <summary>
    /// Checks if user debt exceeds the blocking threshold (25€).
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>True if debt exceeds threshold, false otherwise</returns>
    Task<bool> IsDebtAboveThresholdAsync(int userId);

    /// <summary>
    /// Processes automatic card blocking due to debt threshold.
    /// </summary>
    /// <param name="userId">User ID</param>
    Task ProcessAutomaticBlockingAsync(int userId);

    /// <summary>
    /// Processes card reactivation after debt payment.
    /// </summary>
    /// <param name="userId">User ID</param>
    Task ProcessCardReactivationAsync(int userId);
}