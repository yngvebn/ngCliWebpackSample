using System.Collections.Generic;
using System.Web.Http;
using AutoMapper;
using Rikstoto.Service.RaceDay.Contracts.PoolService;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Game.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using TotalInvestmentForPool = Rikstoto.Toto.Features.Game.Models.TotalInvestmentForPool;

namespace Rikstoto.Toto.Features.Game.RaceDay.ProductTimeline
{
    [RoutePrefix(ApiRoutes.Game.ProductTimeline.RoutePrefix)]
    public class ProductTimelineApiController : ApiController
    {
        private readonly IMapper _mapper;

        private readonly IRaceDayServiceGateway _raceDayServiceGateway;
        private readonly IProductTimelineViewModelPopulator _viewModelPopulator;

        public ProductTimelineApiController(IMapper mapper, IRaceDayServiceGateway raceDayServiceGateway, IProductTimelineViewModelPopulator viewModelPopulator)
        {
            _mapper = mapper;
            _raceDayServiceGateway = raceDayServiceGateway;
            _viewModelPopulator = viewModelPopulator;
        }

        [HttpGet]
        [Route(ApiRoutes.Game.ProductTimeline.TotalInvestmentForRaceDay)]
        public IHttpActionResult GetInvestmentForRaceDay(string raceDayKey)
        {
            var totalInvestmentsForRaceDay = _raceDayServiceGateway.GetTotalInvestmentsForRaceDay(RaceDayKey.FromString(raceDayKey));

            return Ok(RestResult<List<TotalInvestmentForPool>>.CreateSuccess(_mapper.Map<List<TotalInvestmentForPool>>(totalInvestmentsForRaceDay)));
        }

        
        [HttpGet]
        [Route(ApiRoutes.Game.ProductTimeline.ProductsForTimeline)]
        public IHttpActionResult GetProductsForTimeline(string raceDayKey)
        {
            GamesForRaceDay gamesForRaceDay = _raceDayServiceGateway.GetGamesForRaceDay(RaceDayKey.FromString(raceDayKey));

            return Ok(RestResult<ProductsForTimeline>.CreateSuccess(_viewModelPopulator.Populate(gamesForRaceDay)));
        }

    }
}