using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class TotalInvestmentForPool
    {
        public string RaceDay { get; set; }

        public BetTypeCode Product { get; set; }

        public int? RaceNumber { get; set; }

        public long TotalInvestment { get; set; }
    }
}