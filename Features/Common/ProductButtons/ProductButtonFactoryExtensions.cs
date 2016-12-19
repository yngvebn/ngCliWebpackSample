using System.Text.RegularExpressions;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Common.ProductButtons
{
    public static class ProductButtonFactoryExtensions
    {
        public static bool IsV75OrV76(this BetTypeCode code)
        {
            return code == BetTypeCode.V75 || code == BetTypeCode.V76;
        }

        public static bool IsDomestic(this RaceDayKey raceDayKey)
        {
            return !Regex.IsMatch(raceDayKey.TrackKey.Code, "^(L[134]|F[1-9])");
        }
    }
}