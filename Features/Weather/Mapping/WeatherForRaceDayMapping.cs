using AutoMapper;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Weather.Mapping
{
    public class WeatherForRaceDayMapping : Profile
    {
        public WeatherForRaceDayMapping()
        {
            CreateMap<Service.RaceDay.Contracts.WeatherService.WeatherForRaceDay, Models.WeatherForRaceDay>();

            CreateMap<RaceDayKey, string>()
                .ConvertUsing(RaceDayKey.ToString);

            CreateMap<string, RaceDayKey>()
                .ConvertUsing(RaceDayKey.FromString);   
        }
    }
}