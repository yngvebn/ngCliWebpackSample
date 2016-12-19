namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.HorseAnnualStatistics.Models
{
    public class HorseStatisticsForYear
    {
        public int Year { get; set; }

        public int NumberOfStarts { get; set; }

        public int NumberOfFirstPlaces { get; set; }

        public int NumberOfSecondPlaces { get; set; }

        public int NumberOfThirdPlaces { get; set; }

        public string Record { get; set; }

        public int TotalEarnings { get; set; }
    }
}