using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.FormRows.Models
{
    public class TrotFormRowsForRace
    {
        public string RaceDay { get; set; }

        public int RaceNumber { get; set; }

        public IList<TrotFormRowsForStart> FormRowsForStarts { get; set; }
    }
}