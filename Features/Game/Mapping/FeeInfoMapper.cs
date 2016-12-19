using AutoMapper;
using Rikstoto.Toto.Features.BettingInfo;
using FeeInfo = Rikstoto.Service.BettingServiceContract.FeeInfo;

namespace Rikstoto.Toto.Features.Game.Mapping
{
    public class FeeInfoMapper : Profile
    {
        public FeeInfoMapper()
        {
            CreateMap<FeeInfo, BettingInfo.FeeInfo>();
        }
    }
}