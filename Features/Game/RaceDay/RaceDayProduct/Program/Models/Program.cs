using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models
{
    public class Program
    {
        public string RaceDay { get; set; }

        public string Product { get; set; }

        public IList<RaceProgram> Races { get; set; }

        public int NumberOfStartsPerRace { get; set; }
    }
}