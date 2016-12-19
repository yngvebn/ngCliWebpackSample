using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Odds.Models
{
    public class DoubleOddsPaged
    {
        public IList<DoubleOdds> DoubleOdds { get; set; }

        public bool HasMorePages { get; set; }
    }
}