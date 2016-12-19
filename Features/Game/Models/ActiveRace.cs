using System;
using Rikstoto.Service.RaceDay.Contracts.PoolService;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ActiveRace
    {
        public int RaceNumber { get; set; }

        public DateTime StartTime { get; set; }

        public ProgressStatus ProgressStatus { get; set; }
    }
}