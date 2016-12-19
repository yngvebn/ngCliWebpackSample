using System;
using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Game.Models
{
    public class ProductForTimeline: IComparable<ProductForTimeline>
    {
        public BetTypeCode Product { get; set; }

        public bool IsMultiLegGame => Product.IsMultiLegBetType();

        public bool IsSingleLegGame => !Product.IsMultiLegBetType();
        
        public DateTime EarliestRaceStart { get; set; }

        public int CompareTo(ProductForTimeline other)
        {
            var thisSortIndex = IsMultiLegGame || Product == BetTypeCode.QPlus ? 0 : Product.GetSortIndex();
            var otherSortIndex = other.IsMultiLegGame || other.Product == BetTypeCode.QPlus ? 0 : other.Product.GetSortIndex();

            var order = thisSortIndex.CompareTo(otherSortIndex);
            if (order == 0) order = EarliestRaceStart.CompareTo(other.EarliestRaceStart);
            if (order == 0) order = Product.GetSortIndex().CompareTo(other.Product.GetSortIndex());

            return order;
        }
    }
}