using System.Collections.Generic;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.BettingInfo
{
    public class PriceInfoForProduct
    {
        public BetMethod BetMethod { get; set; }
        public BetTypeCode Product { get; set; }
        public long DefaultRowPrice { get; set; }
        public long DefaultSuperRowPrice { get; set; }
        public FeeInfo FeeInfo { get; set; }
        public bool IsFixed { get; set; }
        public long MaxPrice { get; set; }
        public long MinPrice { get; set; }
        public IDictionary<int, long> MultiDayPrices { get; set; }
        public IList<long> PredefinedPrices { get; set; }
        public IList<long> PredefinedSuperPrices { get; set; }
        public long RegularPriceStep { get; set; }
        public long SuperMinPrice { get; set; }
        public long SuperPriceStep { get; set; }
    }
}