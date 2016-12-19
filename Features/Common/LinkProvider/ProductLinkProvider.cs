using System.Collections.Generic;
using System.Linq;
using Rikstoto.Service.RaceDay.Contracts.PoolService;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Extensions;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.Common.LinkProvider
{
    public class ProductLinkProvider : IProductLinkProvider
    {
        private readonly IRaceDayServiceGateway _raceDayServiceGateway;

        public ProductLinkProvider(IRaceDayServiceGateway raceDayServiceGateway)
        {
            _raceDayServiceGateway = raceDayServiceGateway;
        }

        public string FindLinkForNextAvailableProduct(string value, string baseLink)
        {
            BetTypeCode product = value.TryCastTo<BetTypeCode>();

            if (product == BetTypeCode.Undefined || !product.IsVGame())
                return null;

            IList<ActivePoolsForRaceDay> racedays = _raceDayServiceGateway.GetActivePoolsForRaceDay();

            ActivePoolsForRaceDay raceday = racedays
                .OrderBy(x => x.StartTime)
                .FirstOrDefault(x => x.Products.Any(p => p.Product == product && p.IsOpenForBet));

            return raceday == null ? null : $"{baseLink}#/{RaceDayKey.ToString(raceday.RaceDay)}/{product}/";
        }
    }
}