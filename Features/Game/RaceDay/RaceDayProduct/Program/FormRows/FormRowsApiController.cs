using System.Web.Http;
using AutoMapper;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.FormRows.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using WebApi.OutputCache.V2;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.FormRows
{
    [RoutePrefix(ApiRoutes.Game.Program.FormRows.RoutePrefix)]
    public class FormRowsApiController : ApiController
    {
        private readonly IRaceDayServiceGateway _raceDayServiceGateway;
        private readonly IMapper _mapper;

        public FormRowsApiController(IRaceDayServiceGateway raceDayServiceGateway, IMapper mapper)
        {
            _raceDayServiceGateway = raceDayServiceGateway;
            _mapper = mapper;
        }

        [HttpGet]
        [Route(ApiRoutes.Game.Program.FormRows.Race)]
        [CacheOutput(ClientTimeSpan = 60 * 60)]
        public IHttpActionResult GetTrotFormRowsForRace(string raceDayKey, int raceNumber)
        {
            Service.RaceDay.Contracts.PoolService.FormRows.TrotFormRowsForRace formsRows = _raceDayServiceGateway.GetTrotFormRowsForRace(RaceDayKey.FromString(raceDayKey), raceNumber);

            return Ok(RestResult<TrotFormRowsForRace>.CreateSuccess(_mapper.Map<TrotFormRowsForRace>(formsRows)));
        }
    }
}