using System;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program
{
    public interface IBetStatisticsPopulator
    {
        ProgramAddition Populate(ProgramAddition programChanges, RaceDayKey raceDay, BetTypeCode product);
    }
}