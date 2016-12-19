using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using WebApi.OutputCache.V2;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program
{
    [RoutePrefix(ApiRoutes.Game.Program.RoutePrefix)]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProgramApiController : ApiController
    {
        private readonly IRaceDayServiceGateway _raceDayServiceGateway;
        private readonly IBetStatisticsPopulator _betStatisticsPopulator;
        private readonly IMapper _mapper;

        public ProgramApiController(IRaceDayServiceGateway raceDayServiceGateway, IBetStatisticsPopulator betStatisticsPopulator, IMapper mapper)
        {
            _raceDayServiceGateway = raceDayServiceGateway;
            _betStatisticsPopulator = betStatisticsPopulator;
            _mapper = mapper;
        }

        [HttpGet]
        [Route(ApiRoutes.Game.Program.ProgramForGame)]
        [CacheOutput(ClientTimeSpan = 60 * 60)]
        public IHttpActionResult GetProgramForGame(string raceDayKey, BetTypeCode product)
        {
            Service.RaceDay.Contracts.PoolService.Program program = _raceDayServiceGateway.GetProgramForPool(RaceDayKey.FromString(raceDayKey), product);

            return Ok(RestResult<Models.Program>.CreateSuccess(_mapper.Map<Models.Program>(program)));
        }

        [HttpGet]
        [Route(ApiRoutes.Game.Program.ProgramAdditionForGame)]
        public IHttpActionResult GetProgramAdditionForGame(string raceDayKey, BetTypeCode product)
        {
            RaceDayKey raceDay = RaceDayKey.FromString(raceDayKey);
            Service.RaceDay.Contracts.PoolService.ProgramChanges programAdditionForPool = _raceDayServiceGateway.GetProgramChangesForPool(raceDay, product);

            var programChanges = _mapper.Map<ProgramAddition>(programAdditionForPool);

            return Ok(RestResult<ProgramAddition>.CreateSuccess(_betStatisticsPopulator.Populate(programChanges, raceDay, product)));
        }

        [HttpGet]
        [Route(ApiRoutes.Game.Program.ScratchedStarts)]
        public IHttpActionResult GetScratchedStarts(string raceDayKey, BetTypeCode product)
        {
            IDictionary<int, int[]> scratchedStartsByRaceNumber = _raceDayServiceGateway.GetScratchedStartsForPool(RaceDayKey.FromString(raceDayKey), product);

            IList<ScratchedStart> scratchedStarts = scratchedStartsByRaceNumber.SelectMany(scratchesForRace => scratchesForRace.Value.Select(start => new ScratchedStart { RaceNumber = scratchesForRace.Key, StartNumber = start })).ToList();

            return Ok(RestResult<IList<ScratchedStart>>.CreateSuccess(scratchedStarts));
        }
    }
}