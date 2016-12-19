using System;
using AutoMapper;
using Rikstoto.Service.RaceDay.Contracts.PoolService.FormRows;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.FormRows.Mapping
{
    public class FormRowMapping : Profile
    {
        public FormRowMapping()
        {
            CreateMap<TrotFormRowsForRace, Models.TrotFormRowsForRace>();
            CreateMap<TrotFormRowsForStart, Models.TrotFormRowsForStart>();

            CreateMap<TrotFormRow, Models.TrotFormRow>()
                .ForMember(dst => dst.Postposition, opt => opt.MapFrom(src => src.PostPosition.ToString().PadLeft(2, '0')))
                .ForMember(dst => dst.RaceNumber, opt => opt.MapFrom(src => src.RaceNumber.ToString().PadLeft(2, '0')))
                .ForMember(dst => dst.FirstPrize, opt => opt.ResolveUsing(row => $"{Math.Ceiling(row.FirstPrize/1000m)}'"));

            CreateMap<string, RaceDayKey>()
                .ConvertUsing(RaceDayKey.FromString);
        }
    }
}