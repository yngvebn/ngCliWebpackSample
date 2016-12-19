using System;
using System.Collections.Generic;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ActivePoolsForRaceDayGroupedByDate
    {
        public DateTime Date { get; set; }

        public List<ActivePoolsForRaceDay> PoolsForRaceDay { get; set; } 
    }
}