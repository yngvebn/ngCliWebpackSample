using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.Ajax.Utilities;
using Rikstoto.Service.BettingServiceContract;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.BettingInfo;

namespace Rikstoto.Toto.Features.Game.Mapping
{
    public class PricesForProductMapping : Profile
    {
        public PricesForProductMapping()
        {
            CreateMap<ProductPriceInfo, PriceInfoForProduct>()
                .ForMember(dst => dst.Product, opt => opt.MapFrom(src => src.BetType));
        }
    }
}