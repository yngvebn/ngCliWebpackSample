using System.Collections.Generic;
using Rikstoto.Service.RaceDay.Contracts.PoolService;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models
{
    public class RaceProgram
    {
        public int RaceNumber { get; set; }

        public string RaceName { get; set; }

        public int Distance { get; set; }

        public StartMethod StartMethod { get; set; }

        public IList<Start> Starts { get; set; }

        public string Propositions { get; set; }

        public bool IsMonte { get; set; }
    }
}