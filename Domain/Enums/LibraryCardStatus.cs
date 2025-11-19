namespace Domain.Enums;

public enum LibraryCardStatus
{
    Active = 1,
    TemporarilyBlocked = 2,
    Cancelled = 3 // when is lost instead of permanently blocked is cancelled also when user informed that not going to use it anymore
}