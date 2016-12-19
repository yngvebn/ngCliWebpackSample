using System.Web.Http;
using AutoMapper;
using Castle.Components.DictionaryAdapter.Xml;
using Rikstoto.Service.BettingServiceContract.DataContracts;
using Rikstoto.Service.Expert.Contracts;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Service.VirtualAccountServiceContracts;
using Rikstoto.Toto.Features.Account.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.Security;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.Account
{
    [RoutePrefix(ApiRoutes.Account.RoutePrefix)]
    public class AccountApiController : ApiController
    {
        private readonly IBettingServiceGateway _bettingServiceGateway;
        private readonly IVirtualAccountServiceGateway _virtualAccountServiceGateway;
        private readonly ICustomerProvider _customerProvider;
        private readonly IExpertMarketServiceGateway _expertMarketServiceGateway;
        private readonly IBetDateProvider _betDateProvider;
        private readonly IBettingHistoryServiceGateway _bettingHistoryServiceGateway;
        private readonly ITeamGameServiceGateway _teamGameServiceGateway;
        private readonly IMapper _mapper;

        public AccountApiController(IBettingServiceGateway bettingServiceGateway, IVirtualAccountServiceGateway virtualAccountServiceGateway, ICustomerProvider customerProvider, IExpertMarketServiceGateway expertMarketServiceGateway, IBetDateProvider betDateProvider, IBettingHistoryServiceGateway bettingHistoryServiceGateway, IMapper mapper, ITeamGameServiceGateway teamGameServiceGateway)
        {
            _bettingServiceGateway = bettingServiceGateway;
            _virtualAccountServiceGateway = virtualAccountServiceGateway;
            _customerProvider = customerProvider;
            _expertMarketServiceGateway = expertMarketServiceGateway;
            _betDateProvider = betDateProvider;
            _bettingHistoryServiceGateway = bettingHistoryServiceGateway;
            _mapper = mapper;
            _teamGameServiceGateway = teamGameServiceGateway;
        }

        [HttpGet]
        [Route(ApiRoutes.Account.NumberOfActiveGames)]
        public IHttpActionResult GetNumberOfActiveGames()
        {
            CustomerKey customerKey = _customerProvider.FindCurrentCustomerKey();
            var betDate = _betDateProvider.Today;

            var deliveredTicketsCount = _bettingHistoryServiceGateway.GetNumberOfDeliveredTickets(customerKey, betDate);

            var expertOrdersCount = _expertMarketServiceGateway.GetNumberOfNotDeliveredShareOrders(customerKey, betDate);

            var teamGameOrdersCount = _teamGameServiceGateway.GetNumberOfNotDeliveredShareOrders(customerKey, betDate);

            var numberOfActiveGames = deliveredTicketsCount + expertOrdersCount + teamGameOrdersCount;

            return Ok(RestResult<int>.CreateSuccess(numberOfActiveGames));
        }

        [HttpGet]
        [Route(ApiRoutes.Account.Credit)]
        public IHttpActionResult GetCredit()
        {
            CustomerKey customerKey = _customerProvider.FindCurrentCustomerKey();

            BetLimitStatusAfterBet betLimitStatus = _bettingServiceGateway.GetBetLimitStatusForAmount(customerKey, Money.FromKroner(0));
            VirtualAccount account = _virtualAccountServiceGateway.GetAccount(customerKey);

            var model = new Credit
            {
                Balance = account.Balance.AvailableAmount.Amount,
                RemainingBetLimit = betLimitStatus.LowestLimitRemainder.Amount,
                HasBetLimit = betLimitStatus.AffectedLimit != BetLimit.LimitNotSet
            };

            return Ok(RestResult<Credit>.CreateSuccess(model));
        }
    }
}