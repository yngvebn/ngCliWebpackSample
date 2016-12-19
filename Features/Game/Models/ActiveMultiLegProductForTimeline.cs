using Rikstoto.Service.RaceDay.Contracts.PoolService;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ActiveMultiLegProductForTimeline : ProductForTimeline
    {
        public int[] Races { get; set; }

        public bool IsOpenForBet { get; set; }

        public ProgressStatus ProgressStatus { get; set; }

        public bool IsAbandoned { get; set; }
        
        public bool HasJackpot { get; set; }

        public bool HasBonus { get; set; }

        public bool IsSuper { get; set; }

        public ConsecutiveLegsForMultiLegGame[] ConsecutiveLegs { get; set; }
    }
}