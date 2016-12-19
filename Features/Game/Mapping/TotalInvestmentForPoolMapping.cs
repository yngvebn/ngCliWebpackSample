using AutoMapper;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Game.Mapping
{
    public class TotalInvestmentForPoolMapping : Profile
    {
        public TotalInvestmentForPoolMapping()
        {

            CreateMap<RaceDayKey, string>()
                .ConvertUsing(RaceDayKey.ToString);

            CreateMap<Money, long>()
                .ConvertUsing(c => (c ?? new Money()).Amount);


            CreateMap<Service.RaceDay.Contracts.PoolService.TotalInvestmentForPool, Models.TotalInvestmentForPool>();
        }
    }
}