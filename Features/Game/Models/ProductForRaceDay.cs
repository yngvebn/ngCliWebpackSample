using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ProductForRaceDay
    {
        public BetTypeCode Product { get; set; }

        public int? RaceNumber { get; set; }

        public bool IsOpenForBet { get; set; }

        public bool IsAbandoned { get; set; }

        public bool HasJackpot { get; set; }

        public bool HasBonus { get; set; }
    }
}