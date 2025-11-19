using API.DTO;
using Domain.Enums;
using LibraryInReact.API.Controllers.Services.Authentication;
using LibraryInReact.API.Controllers.Services.Debts;
using Microsoft.AspNetCore.Mvc;

namespace LibraryInReact.API.Controllers.Auth;

/// <summary>
/// Controller for authentication operations.
/// </summary>
[Route("api/auth")]
public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;
    private readonly IDebtService _debtService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IAuthService authService,
        IDebtService debtService,
        ILogger<AuthController> logger)
    {
        _authService = authService;
        _debtService = debtService;
        _logger = logger;
    }

    /// <summary>
    /// Authenticates user with library card credentials.
    /// </summary>
    /// <param name="loginDto">Library card login credentials</param>
    /// <returns>Authentication response with JWT token</returns>
    [HttpPost("library-card")]
    public async Task<ActionResult<AuthResponseDto>> LoginWithLibraryCard([FromBody] LibraryCardLoginDto loginDto)
    {
        try
        {
            var user = await _authService.AuthenticateWithLibraryCardAsync(loginDto.CardNumber, loginDto.Pin);
            
            if (user == null)
            {
                _logger.LogWarning("Failed library card authentication attempt for card: {CardNumber}", loginDto.CardNumber);
                return Unauthorized("Invalid card number or PIN");
            }

            var token = await _authService.GenerateJwtTokenAsync(user);
            var totalDebt = await _debtService.GetTotalDebtAsync(user.Id);

            var response = new AuthResponseDto
            {
                Token = token,
                User = MapToUserProfileDto(user),
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            };

            _logger.LogInformation("Successful library card authentication for user: {UserId}", user.Id);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during library card authentication");
            return StatusCode(500, "An error occurred during authentication");
        }
    }

    /// <summary>
    /// Authenticates user with BankID.
    /// </summary>
    /// <param name="loginDto">BankID login credentials</param>
    /// <returns>Authentication response with JWT token</returns>
    [HttpPost("bankid")]
    public async Task<ActionResult<AuthResponseDto>> LoginWithBankId([FromBody] BankIdLoginDto loginDto)
    {
        try
        {
            var user = await _authService.AuthenticateWithBankIdAsync(loginDto.PersonalNumber);
            
            if (user == null)
            {
                _logger.LogWarning("Failed BankID authentication attempt for personal number: {PersonalNumber}", loginDto.PersonalNumber);
                return Unauthorized("BankID authentication failed");
            }

            var token = await _authService.GenerateJwtTokenAsync(user);
            var totalDebt = await _debtService.GetTotalDebtAsync(user.Id);

            var response = new AuthResponseDto
            {
                Token = token,
                User = MapToUserProfileDto(user),
                ExpiresAt = DateTime.UtcNow.AddDays(7)
            };

            _logger.LogInformation("Successful BankID authentication for user: {UserId}", user.Id);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during BankID authentication");
            return StatusCode(500, "An error occurred during authentication");
        }
    }

    /// <summary>
    /// Maps User entity to UserProfileDto.
    /// </summary>
    private static UserProfileDto MapToUserProfileDto(Domain.User user)
    {
        return new UserProfileDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Address = user.Address,
            PostalCode = user.PostalCode,
            City = user.City,
            Phone = user.Phone,
            SmsNumber = user.SmsNumber,
            Status = user.Status,
            NotificationPreference = user.NotificationPreference,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt,
            LibraryCards = user.LibraryCards.Select(lc => new LibraryCardDto
            {
                Id = lc.Id,
                CardNumber = lc.CardNumber,
                Status = lc.Status,
                IssuedAt = lc.IssuedAt,
                BlockedAt = lc.BlockedAt,
                BlockReason = lc.BlockReason
            }).ToList()
        };
    }
}