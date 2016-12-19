namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.HorseAnnualStatistics.Models
{
    public class HorseAnnualStatistics
    {
        public HorseStatisticsForYear Total { get; set; }

        public HorseStatisticsForYear CurrentYear { get; set; }

        public HorseStatisticsForYear PreviousYear { get; set; }
    }
}