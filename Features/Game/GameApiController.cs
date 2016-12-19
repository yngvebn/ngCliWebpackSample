using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Rikstoto.Service.RaceDay.Contracts.PoolService;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Game.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using ActivePoolsForRaceDay = Rikstoto.Toto.Features.Game.Models.ActivePoolsForRaceDay;
using ActiveRaceDay = Rikstoto.Toto.Features.Game.Models.ActiveRaceDay;
using ProductForRaceDay = Rikstoto.Service.RaceDay.Contracts.PoolService.ProductForRaceDay;

namespace Rikstoto.Toto.Features.Game
{
    [RoutePrefix(ApiRoutes.Game.RoutePrefix)]
    public class GameApiController : ApiController
    {
        private readonly IMapper _mapper;

        private readonly IRaceDayServiceGateway _raceDayServiceGateway;

        public GameApiController(IMapper mapper, IRaceDayServiceGateway raceDayServiceGateway)
        {
            _mapper = mapper;
            _raceDayServiceGateway = raceDayServiceGateway;
        }


        [HttpGet]
        [Route(ApiRoutes.Game.RaceDay)]
        public IHttpActionResult GetActiveRaceDay(string raceDayKey)
        {
            Service.RaceDay.Contracts.PoolService.ActiveRaceDay activeRaceDay = _raceDayServiceGateway.FindActiveRaceDay(RaceDayKey.FromString(raceDayKey));

            return Ok(RestResult<ActiveRaceDay>.CreateSuccess(_mapper.Map<ActiveRaceDay>(activeRaceDay)));
        }

        [HttpGet]
        [Route(ApiRoutes.Game.RaceDays)]
        public IHttpActionResult GetActiveRaceDayPools()
        {
            IList<Service.RaceDay.Contracts.PoolService.ActivePoolsForRaceDay> activeRaceDayPools = _raceDayServiceGateway.GetActivePoolsForRaceDay();

            //--- FEATURE TOGGLING START--- Remove Qplus from RaceDay 
            foreach (var activePoolsForRaceDay in activeRaceDayPools)
                activePoolsForRaceDay.Products = activePoolsForRaceDay.Products.Where(x => x.Product != BetTypeCode.QPlus).ToList();

            // removes all products for Gallop
            foreach (var gallopRaceDay in activeRaceDayPools.Where(pool => pool.SportType == SportType.G)) 
                gallopRaceDay.Products = new List<ProductForRaceDay>();

            //--- FEATURE TOGGLING END---

            IList<ActivePoolsForRaceDay> activeRaceDays = _mapper.Map<IList<ActivePoolsForRaceDay>>(activeRaceDayPools);

            List<ActivePoolsForRaceDayGroupedByDate> groupedByDate = activeRaceDays
                .GroupBy(g => g.StartTime.Date)
                .Select(s => new ActivePoolsForRaceDayGroupedByDate
                {
                    Date = s.Key.Date,
                    PoolsForRaceDay = s.OrderBy(x => x.StartTime).ToList()
                })
                .OrderBy(x => x.Date)
                .ToList();

            return Ok(RestResult<List<ActivePoolsForRaceDayGroupedByDate>>.CreateSuccess(groupedByDate));
        }
    }
}