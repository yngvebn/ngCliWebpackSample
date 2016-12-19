using System;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Common.ProductButtons.Models
{
    public class ProductButton
    {
        public string Url { get; set; }
        public string Text { get; set; }
        
        public static ProductButton Create(RaceDayKey raceDay, BetTypeCode product)
        {
            return new ProductButton
            {
                Url = $"/Spill#/{RaceDayKey.ToString(raceDay)}/{product}/",
                Text = product.PresentAsText()
            };
        }
    }
}