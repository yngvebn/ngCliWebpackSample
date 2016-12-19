using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Odds.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using WebApi.OutputCache.V2;
using DoubleOdds = Rikstoto.Service.RaceDay.Contracts.BetDistributionService.DoubleOdds;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Odds
{
    [RoutePrefix(ApiRoutes.Game.Odds.RoutePrefix)]
    public class OddsApiController : ApiController
    {
        private readonly IMapper _mapper;

        private readonly IRaceDayServiceGateway _raceDayServiceGateway;

        public OddsApiController(IRaceDayServiceGateway raceDayServiceGateway, IMapper mapper)
        {
            _raceDayServiceGateway = raceDayServiceGateway;
            _mapper = mapper;
        }

        [HttpGet]
        [Route(ApiRoutes.Game.Odds.DoubleOdds)]
        [CacheOutput(ClientTimeSpan = 10)]
        public IHttpActionResult GetDoubleOddsPaged(string raceDayKey, int page)
        {
            const int take = 25;
            int skip = (page - 1) * take;

            IList<DoubleOdds> doubleOdds = _raceDayServiceGateway.GetDoubleOdds(RaceDayKey.FromString(raceDayKey))
                .OrderByDescending(x => x.Odds > 0)
                .ThenBy(x => x.Odds)
                .Skip(skip)
                .Take(take + 1)
                .ToList();

            var viewmodel = new DoubleOddsPaged
            {
                HasMorePages = doubleOdds.Count == take + 1,
                DoubleOdds = _mapper.Map<IList<Models.DoubleOdds>>(doubleOdds.Take(take).ToList())
            };

            return Ok(RestResult<DoubleOddsPaged>.CreateSuccess(viewmodel));
        }
    }
}