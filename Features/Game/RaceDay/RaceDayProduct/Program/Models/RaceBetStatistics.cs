using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models
{
    public class RaceBetStatistics
    {
        public int RaceNumber { get; set; }

        public IList<StartBetStatistics> OddsAndInvestment { get; set; }
    }
}