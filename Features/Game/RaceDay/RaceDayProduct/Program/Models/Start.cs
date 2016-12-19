namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models
{
    public class Start
    {
        public int StartNumber { get; set; }

        public string HorseName { get; set; }

        public string Driver { get; set; }

        public int ExtraDistance { get; set; }

        public string Mother { get; set; }

        public string Father { get; set; }

        public string Grandfather { get; set; }

        public string Trainer { get; set; }

        public string Owner { get; set; }

        public string Breeder { get; set; }

        public long TotalEarnings { get; set; }

        public int Age { get; set; }

        public string Color { get; set; }

        public string Sex { get; set; }

        public int PostPosition { get; set; }

        public string RecordVolt { get; set; }

        public string RecordAuto { get; set; }

        public int? WinPercentage { get; set; }

        public int? TriplePercentage { get; set; }

        public HorseAnnualStatistics.Models.HorseAnnualStatistics HorseAnnualStatistics { get; set; }
    }
}