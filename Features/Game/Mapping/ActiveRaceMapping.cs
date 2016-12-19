using AutoMapper;
using Rikstoto.Service.RaceDay.Contracts.PoolService;
using Rikstoto.Toto.Features.Game.Models;

namespace Rikstoto.Toto.Features.Game.Mapping
{
    public class ProductsForTimelineMapping : Profile
    {
        public ProductsForTimelineMapping()
        {
            CreateMap<Race, ActiveRace>()
                .ForMember(dst => dst.ProgressStatus, opt => opt.MapFrom(src => src.ProgressStatus));

            CreateMap<SingleLegGame, ActiveSingleLegProductForTimeline>()
                .ForMember(dst => dst.Races, opt => opt.Ignore())
                .ForMember(dst => dst.EarliestRaceStart, opt => opt.Ignore());

            CreateMap<SingleLegGame, RaceForSingleLegGame>();

            CreateMap<MultiLegGame, ActiveMultiLegProductForTimeline>()
                .ForMember(dst => dst.IsAbandoned, opt => opt.MapFrom(src => src.PoolIsAbandoned))
                .ForMember(dst => dst.IsOpenForBet, opt => opt.MapFrom(src => src.PoolIsOpenForBet))
                .ForMember(dst => dst.ProgressStatus, opt => opt.Ignore())
                .ForMember(dst => dst.ConsecutiveLegs, opt => opt.Ignore())
                .ForMember(dst => dst.EarliestRaceStart, opt => opt.Ignore())
                .ForMember(dst => dst.IsSuper, opt => opt.Ignore());

            CreateMap<GamesForRaceDay, ProductsForTimeline>()
                .ForMember(dst => dst.Products, opt => opt.Ignore());
        }
    }
}