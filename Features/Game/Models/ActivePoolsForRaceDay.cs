using System;
using System.Collections.Generic;
using Rikstoto.Service.RaceDay.Contracts.PoolService;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ActivePoolsForRaceDay
    {
        public string RaceDayName { get; set; }

        public string RaceDay { get; set; }

        public string TrackCode { get; set; }

        public string SportType { get; set; }

        public DateTime StartTime { get; set; }

        public ProgressStatus ProgressStatus { get; set; }

        public IList<ProductForRaceDay> Products { get; set; }
    }
}