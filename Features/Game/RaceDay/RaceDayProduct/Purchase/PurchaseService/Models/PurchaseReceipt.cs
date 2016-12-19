using System;

namespace Rikstoto.Toto.Features.Purchase.Models
{
    public class PurchaseReceipt
    {
        public string TicketSerialNumber { get; set; }

        public string RaceDay { get; set; }

        public string Product { get; set; }

        public long BetCost { get; set; }

        public long SellFee { get; set; }

        public DateTime PurchaseTime { get; set; }
    }
}