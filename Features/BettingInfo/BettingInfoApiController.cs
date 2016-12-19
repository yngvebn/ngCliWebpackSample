using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using WebApi.OutputCache.V2;

namespace Rikstoto.Toto.Features.BettingInfo
{
    [RoutePrefix(ApiRoutes.BettingInformation.RoutePrefix)]
    public class BettingInfoApiController : ApiController
    {
        private readonly IBettingServiceGateway _bettingServiceGateway;
        private readonly IMapper _mapper;

        public BettingInfoApiController(IMapper mapper, IBettingServiceGateway bettingServiceGateway)
        {
            _bettingServiceGateway = bettingServiceGateway;
            _mapper = mapper;
        }

        [HttpGet]
        [Route(ApiRoutes.BettingInformation.PriceInformation)]
        [CacheOutput(ClientTimeSpan = 3600)]
        public IHttpActionResult GetPrices(BetTypeCode product)
        {
            var prices = _mapper.Map<IEnumerable<PriceInfoForProduct>>(_bettingServiceGateway.GetPricesForAllProducts().Where(x => x.BetType == product));

            return Ok(RestResult<IEnumerable<PriceInfoForProduct>>.CreateSuccess(prices));
        }

        [HttpGet]
        [Route(ApiRoutes.BettingInformation.IsBettingSystemOpenForBet)]
        public IHttpActionResult IsBettingSystemOpenForBet()
        {
            return Ok(RestResult<bool>.CreateSuccess(_bettingServiceGateway.IsOpenForBetting()));
        }
    }
}