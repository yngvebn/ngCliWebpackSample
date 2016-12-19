using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ProductsForTimeline
    {
        public string RaceDayKey { get; set; }

        public IList<ActiveRace> Races { get; set; }

        public IList<ProductForTimeline> Products { get; set; }
    }
}