using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models
{
    public class RaceUpdate
    {
        public int RaceNumber { get; set; }

        public IList<int> ScratchedStarts { get; set; }

        public IList<DriverChange> DriverChanges { get; set; }
    }
}