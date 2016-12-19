using System;
using System.Collections.Generic;
using System.Linq;
using log4net;
using Rikstoto.Service.RaceDay.Contracts.PoolService;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Common.ProductButtons.Models;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.Common.ProductButtons
{
    public class ProductButtonFactory : IProductButtonFactory
    {
        private readonly IRaceDayServiceGateway _raceDayServiceGateway;
        private readonly IBetDateProvider _betDateProvider;
        private static readonly ILog Log = LogManager.GetLogger(typeof(ProductButtonFactory));

        public ProductButtonFactory(IRaceDayServiceGateway raceDayServiceGateway, IBetDateProvider betDateProvider)
        {
            _raceDayServiceGateway = raceDayServiceGateway;
            _betDateProvider = betDateProvider;
        }

        public IList<ProductButton> GetFeaturedProductButtons()
        {
            IList<ActivePoolsForRaceDay> racedays = _raceDayServiceGateway.GetActivePoolsForRaceDay();
            DateTime date = _betDateProvider.Now;

            IList<ProductButton> buttons = new List<ProductButton>();

            try
            {
                ProductButton mainProductOfToday = GetMainProductOfToday(racedays, date);

                if (mainProductOfToday != null)
                    buttons.Add(mainProductOfToday);

                ProductButton mainProductOfTheWeek = GetMainProductOfTheWeek(racedays, date);

                if (mainProductOfTheWeek != null)
                    buttons.Add(mainProductOfTheWeek);
            }
            catch (Exception e)
            {
                Log.Error("GetFeaturedProductButtons failed to create buttons", e);
            }

            return buttons;
        }

        public static ProductButton GetMainProductOfTheWeek(IList<ActivePoolsForRaceDay> raceDays, DateTime date)
        {
            IList<ActivePoolsForRaceDay> activeRaceDays = raceDays
                .Where(x => x.Products.Any(p => p.Product.IsV75OrV76() && p.IsOpenForBet) && x.RaceDay.IsDomestic() && x.ProgressStatus != ProgressStatus.Abandoned)
                .ToList();

            TimeSpan v75StartTimeOfDay = new TimeSpan(19, 00, 00);
            TimeSpan v75EndTimeOfDay = new TimeSpan(15, 00, 00);
            BetTypeCode product = BetTypeCode.V75;

            if (date.DayOfWeek.CompareTo(DayOfWeek.Wednesday) < 0)
                product = BetTypeCode.V76;

            if (date.DayOfWeek == DayOfWeek.Wednesday)
                product = date.TimeOfDay >= v75StartTimeOfDay ? BetTypeCode.V75 : BetTypeCode.V76;

            if (date.DayOfWeek.CompareTo(DayOfWeek.Saturday) < 0 && date.DayOfWeek.CompareTo(DayOfWeek.Wednesday) > 0)
                product = BetTypeCode.V75;

            if (date.DayOfWeek == DayOfWeek.Saturday)
                product = date.TimeOfDay > v75EndTimeOfDay ? BetTypeCode.V76 : BetTypeCode.V75;

            if (date.DayOfWeek.CompareTo(DayOfWeek.Saturday) > 0)
                product = BetTypeCode.V76;

            var raceDay = activeRaceDays.FirstOrDefault(x => x.Products.Any(p => p.Product == product));

            return raceDay == null ? null : ProductButton.Create(raceDay.RaceDay, product);
        }

        public static ProductButton GetMainProductOfToday(IEnumerable<ActivePoolsForRaceDay> raceDays, DateTime date)
        {
            IList<ActivePoolsForRaceDay> todaysRaceDays = raceDays
                .Where(x => Equals(x.RaceDay.RaceDayDate, date.AsDate()) && x.RaceDay.IsDomestic() && x.ProgressStatus != ProgressStatus.Abandoned)
                .Where(x => x.Products.Any(p => p.Product.IsVGame() && p.IsOpenForBet))
                .OrderBy(x => x.StartTime)
                .ToList();

            if (!todaysRaceDays.Any())
                return null;

            ActivePoolsForRaceDay raceDay = todaysRaceDays.OrderByDescending(x => x.Products.Max(p => (int)p.Product)).First();
            BetTypeCode product = raceDay.Products
                .Where(x => x.Product.IsVGame() && x.IsOpenForBet)
                .OrderByDescending(x => (int)x.Product)
                .Select(x => x.Product)
                .First();

            return product.IsV75OrV76() ? null : ProductButton.Create(raceDay.RaceDay, product);
        }
    }
}