namespace Rikstoto.Toto.Features.Purchase.Models
{
    public enum PurchaseErrorCode
    {
        NotSet = 0,
        CouldNotSetBetLimit = 1,
        LimitNotSet = 2,
        ExceededDailyBetLimit = 3,
        ExceededWeeklyBetLimit = 4,
        ExceededMonthlyBetLimit = 5,
        NotEnoughFunds = 6,
        ClosedForBetting = 7,
        Unknown = 8
    }
}