using AutoMapper;
using Rikstoto.Service.RaceDay.Contracts.BetDistributionService;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Odds.Mapping
{

    public class OddsMapping : Profile
    {
        public OddsMapping()
        {
            CreateMap<DoubleOdds, Models.DoubleOdds>();
        }
    }
}