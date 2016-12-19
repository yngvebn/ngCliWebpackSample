using System;
using Rikstoto.Service.RaceDay.Contracts.PoolService;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ActiveRaceDay
    {
        public string RaceDayName { get; set; }

        public string RaceDayKey { get; set; }

        public string TrackCode { get; set; }

        public string SportType { get; set; }

        public DateTime StartTime { get; set; }

        public ProgressStatus ProgressStatus { get; set; }
    }
}