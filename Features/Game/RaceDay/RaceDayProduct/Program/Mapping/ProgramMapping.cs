using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Rikstoto.Service.RaceDay.Contracts.PoolService;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Mapping
{
    public class ProgramMapping : Profile
    {
        public ProgramMapping()
        {
            CreateMap<Service.RaceDay.Contracts.PoolService.Program, Models.Program>();

            CreateMap<RaceProgram, Models.RaceProgram>();

            CreateMap<Start, Models.Start>()
                .ForMember(dst => dst.TotalEarnings, opt => opt.MapFrom(src => src.TotalEarnings.Amount));

            CreateMap<IList<Service.RaceDay.Contracts.PoolService.HorseAnnualStatistics>, HorseAnnualStatistics.Models.HorseAnnualStatistics>()
                .ForMember(dst => dst.Total, opt => opt.MapFrom(src => src.SingleOrDefault(x => x.Year == 0)))
                .ForMember(dst => dst.CurrentYear, opt => opt.MapFrom(src => src.Where(x => x.Year != 0).OrderByDescending(x => x.Year).FirstOrDefault()))
                .ForMember(dst => dst.PreviousYear, opt => opt.MapFrom(src => src.Where(x => x.Year != 0).OrderByDescending(x => x.Year).Skip(1).FirstOrDefault()));

            CreateMap<ProgramChanges, Models.ProgramAddition>()
                .ForMember(dst => dst.RaceBetStatistics, opt => opt.ResolveUsing(changes => new List<RaceBetStatistics>()));

            CreateMap<RaceUpdate, Models.RaceUpdate>();

            CreateMap<RaceBetStatistics, Models.RaceBetStatistics>();

            CreateMap<DriverChange, Models.DriverChange>();

            CreateMap<StartBetStatistics, Models.StartBetStatistics>();

            CreateMap<Service.RaceDay.Contracts.PoolService.HorseAnnualStatistics, HorseAnnualStatistics.Models.HorseStatisticsForYear>().IgnoreAllPropertiesWithAnInaccessibleSetter();

        }
    }
}