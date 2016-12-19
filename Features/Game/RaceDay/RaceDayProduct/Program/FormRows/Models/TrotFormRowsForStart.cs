using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.FormRows.Models
{
    public class TrotFormRowsForStart
    {
        public int StartNumber { get; set; }

        public IList<TrotFormRow> FormRows { get; set; }
    }
}