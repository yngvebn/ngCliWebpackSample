using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models
{
    public class ProgramAddition
    {
        public string RaceDay { get; set; }

        public string Product { get; set; }

        public IList<RaceUpdate> RaceUpdates { get; set; }

        public IList<RaceBetStatistics> RaceBetStatistics { get; set; }
    }
}