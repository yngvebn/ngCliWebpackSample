using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ActiveSingleLegProductForTimeline : ProductForTimeline
    {
        public IList<RaceForSingleLegGame> Races { get; set; }
    }
}