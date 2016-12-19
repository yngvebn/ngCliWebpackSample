using AutoMapper;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Game.Mapping
{
    public class RaceDayMapping : Profile
    {
        public RaceDayMapping()
        {
            CreateMap<Service.RaceDay.Contracts.PoolService.ProductForRaceDay, Models.ProductForRaceDay>();

            CreateMap<RaceDayKey, string>()
                .ConvertUsing(RaceDayKey.ToString);

            CreateMap<string, RaceDayKey>()
                .ConvertUsing(RaceDayKey.FromString);

            CreateMap<Service.RaceDay.Contracts.PoolService.ActiveRaceDay, Models.ActiveRaceDay>();

            CreateMap<Service.RaceDay.Contracts.PoolService.ActivePoolsForRaceDay, Models.ActivePoolsForRaceDay>();
        }
    }
}