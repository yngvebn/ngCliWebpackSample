using System;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.FormRows.Models
{
    public class TrotFormRow
    {
        public DateTime RaceDate { get; set; }

        public string TrackCode { get; set; }

        public string RaceNumber { get; set; }

        public int StartNumber { get; set; }

        public int Distance { get; set; }

        public bool Monte { get; set; }

        public string Driver { get; set; }

        public string Place { get; set; }

        public string Postposition { get; set; }

        public string Time { get; set; }

        public string WinOdds { get; set; }

        public bool? Favorite { get; set; }

        public string FirstPrize { get; set; }
    }
}