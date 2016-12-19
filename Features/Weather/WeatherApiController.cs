using System.Web.Caching;
using System.Web.Http;
using AutoMapper;
using Rikstoto.Service.RaceDay.Contracts.WeatherService;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using WebApi.OutputCache.V2;
using WeatherForRaceDay = Rikstoto.Toto.Features.Weather.Models.WeatherForRaceDay;

namespace Rikstoto.Toto.Features.Weather
{
    [RoutePrefix(ApiRoutes.Weather.RoutePrefix)]
    public class WeatherApiController : ApiController
    {
        private readonly IMapper _mapper;

        private readonly IRaceDayServiceGateway _raceDayServiceGateway;

        public WeatherApiController(IMapper mapper, IRaceDayServiceGateway raceDayServiceGateway)
        {
            _mapper = mapper;
            _raceDayServiceGateway = raceDayServiceGateway;
        }

        [AllowAnonymous]
        [CacheOutput(ClientTimeSpan = 60*30)]
        [HttpGet]
        [Route(ApiRoutes.Weather.RaceDay)]
        public IHttpActionResult GetWeatherForRaceDay(string raceDayKey)
        {
            Service.RaceDay.Contracts.WeatherService.WeatherForRaceDay weather = _raceDayServiceGateway.GetWeatherForRaceDay(RaceDayKey.FromString(raceDayKey));

            return Ok(RestResult<WeatherForRaceDay>.CreateSuccess(_mapper.Map<WeatherForRaceDay>(weather)));
        }
    }
}