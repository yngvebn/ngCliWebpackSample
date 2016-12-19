using System;
using System.Linq;
using System.Web.Http;
using Rikstoto.Common.BetData.DomainModels;
using Rikstoto.Service.BettingHistoryServiceContract;
using Rikstoto.Service.BettingServiceContract.Commands;
using Rikstoto.Service.BettingServiceContract.DataContracts;
using Rikstoto.Service.CustomerManagementServiceContract;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Service.VirtualAccountServiceContracts;
using Rikstoto.Toto.Features.Purchase.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.Security;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Purchase.PurchaseService
{
    [RoutePrefix(ApiRoutes.Purchase.RoutePrefix)]
    public class PurchaseApiController : ApiController
    {
        private readonly IBettingServiceGateway _bettingServiceGateway;

        private readonly IBettingHistoryServiceGateway _bettingHistoryServiceGateway;

        private readonly ICustomerProvider _customerProvider;

        private readonly ICustomerServiceGateway _customerServiceGateway;

        private readonly IVirtualAccountServiceGateway _virtualAccountServiceGateway;

        public PurchaseApiController(ICustomerProvider customerProvider, IVirtualAccountServiceGateway virtualAccountServiceGateway, IBettingServiceGateway bettingServiceGateway, ICustomerServiceGateway customerServiceGateway, IBettingHistoryServiceGateway bettingHistoryServiceGateway)
        {
            _customerProvider = customerProvider;
            _virtualAccountServiceGateway = virtualAccountServiceGateway;
            _bettingServiceGateway = bettingServiceGateway;
            _customerServiceGateway = customerServiceGateway;
            _bettingHistoryServiceGateway = bettingHistoryServiceGateway;
        }

        [HttpPost]
        [Route(ApiRoutes.Purchase.Process)]
        public IHttpActionResult ProcessPurchase(PurchaseRequest purchase)
        {
            BetData betData = BetData.Parse(purchase.BetData);

            CustomerKey customerKey = _customerProvider.GetCurrentCustomer().Key;

            PurchaseErrorCode errorCode = ValidatePurchaseRequest(customerKey, betData.EstimatedTotalPrice);

            if (errorCode != PurchaseErrorCode.NotSet)
                return Ok(RestResult<string>.CreateFailed(errorCode.ToString()));

            Guid purchaseIdentifier = Guid.NewGuid();

            CommandResult placeBetResult = _bettingServiceGateway.Execute(new PlaceNormalBetForMultiLegGame
            {
                PurchaseIdentifier = purchaseIdentifier,
                CustomerPlacingBet = _customerServiceGateway.GetBettingReference(GetCustomerBettingInfo(customerKey)),
                RaceDay = betData.RaceDayKey,
                Product = betData.BetTypeCode,
                FirstRaceNumber = betData.RaceNumber,
                IsFirstPrizeOnlyBet = betData.IsFirstPrizeOnlyBet,
                LegMarks = betData.Marks.ToDictionary(mark => mark.LegNumber, mark => mark.Marks),
                RowPrice = Money.FromOere(betData.RowPrice)
            });

            if (!placeBetResult.IsExecuted)
                return Ok(RestResult<string>.CreateFailed(placeBetResult.ErrorCode.ToString(), placeBetResult.Message));

            TicketKey ticketKey = _bettingServiceGateway.GetTicketSerialNumber(purchaseIdentifier);

            SingleBetItem betItem = _bettingHistoryServiceGateway.GetBetItem(new TicketKey(ticketKey.TicketSerialNumber));

            return Ok(RestResult<PurchaseReceipt>.CreateSuccess(new PurchaseReceipt
            {
                TicketSerialNumber = ticketKey.TicketSerialNumber,
                RaceDay = RaceDayKey.ToString(betData.RaceDayKey),
                Product = betData.BetTypeCode.ToString(),
                SellFee = betItem.TicketReceipt.SellFee.Amount,
                BetCost = betItem.TicketReceipt.BetCost.Amount,
                PurchaseTime = betItem.TicketReceipt.BetTimeSold
            }));
        }

        private CustomerBettingReferenceInfo GetCustomerBettingInfo(CustomerKey customerKey)
        {
            return new CustomerBettingReferenceInfo
            {
                CustomerKey = customerKey,
                BettingCardType = BettingCardType.EtotoCard,
                ExternalAccountKey = _customerServiceGateway.GetAccountNumber(customerKey)
            };
        }

        private PurchaseErrorCode ValidatePurchaseRequest(CustomerKey customerKey, Money totalCost)
        {
            VirtualAccount account = _virtualAccountServiceGateway.GetAccount(customerKey);

            if (account.Balance.AvailableAmount < totalCost)
                return PurchaseErrorCode.NotEnoughFunds;

            BetLimitStatusAfterBet betPeriodSummary = _bettingServiceGateway.GetBetLimitStatusForAmount(customerKey, totalCost);

            if (betPeriodSummary.AffectedLimit == BetLimit.LimitNotSet)
                return PurchaseErrorCode.LimitNotSet;

            if (betPeriodSummary.Exceeded)
            {
                switch (betPeriodSummary.AffectedLimit)
                {
                    case BetLimit.Daily:
                        return PurchaseErrorCode.ExceededDailyBetLimit;
                    case BetLimit.Weekly:
                        return PurchaseErrorCode.ExceededWeeklyBetLimit;
                    case BetLimit.Monthly:
                        return PurchaseErrorCode.ExceededMonthlyBetLimit;
                    default:
                        return PurchaseErrorCode.ExceededDailyBetLimit;
                }
            }
            return PurchaseErrorCode.NotSet;
        }
    }
}