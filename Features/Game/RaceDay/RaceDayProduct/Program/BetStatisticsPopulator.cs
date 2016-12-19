using System.Collections.Generic;
using System.Linq;
using Rikstoto.Service.RaceDay.Contracts.BetDistributionService;
using Rikstoto.Service.SharedContracts;
using Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program.Models;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.Game.RaceDay.RaceDayProduct.Program
{
    public class BetStatisticsPopulator : IBetStatisticsPopulator
    {
        private readonly IRaceDayServiceGateway _raceDayServiceGateway;

        public BetStatisticsPopulator(IRaceDayServiceGateway raceDayServiceGateway)
        {
            _raceDayServiceGateway = raceDayServiceGateway;
        }

        public ProgramAddition Populate(ProgramAddition programChanges, RaceDayKey raceDay, BetTypeCode product)
        {
            if (product.IsVGame())
            {
                PopulateVxyStatistics(programChanges, raceDay, product);
            }
            else if (product == BetTypeCode.DD)
            {
                PopulateDdStatistics(programChanges, raceDay, product);
            }

            return programChanges;
        }

        private void PopulateDdStatistics(ProgramAddition programChanges, RaceDayKey raceDay, BetTypeCode product)
        {
            IList<int> raceNumbers = _raceDayServiceGateway.GetRaceNumbersForPool(raceDay, product);

            foreach (var raceNumber in raceNumbers)
            {
                IList<WinOdds> winOdds = _raceDayServiceGateway.GetWinOdds(raceDay, raceNumber);
                IList<PlaceOdds> placeOdds = _raceDayServiceGateway.GetPlaceOdds(raceDay, raceNumber);

                programChanges.RaceBetStatistics.Add(new RaceBetStatistics
                {
                    RaceNumber = raceNumber,
                    OddsAndInvestment = CreateStartBetStatistics(winOdds, placeOdds)
                });
            }
        }

        private void PopulateVxyStatistics(ProgramAddition programChanges, RaceDayKey raceDay, BetTypeCode product)
        {
            IList<int> raceNumbers = _raceDayServiceGateway.GetRaceNumbersForPool(raceDay, product);
            IList<RaceInvestmentDistribution> raceInvestmentDistributions = _raceDayServiceGateway.GetInvestmentDistribution(raceDay, product);

            foreach (var raceNumber in raceNumbers)
            {
                IList<WinOdds> winOddses = _raceDayServiceGateway.GetWinOdds(raceDay, raceNumber);

                programChanges.RaceBetStatistics.Add(new RaceBetStatistics
                {
                    RaceNumber = raceNumber,
                    OddsAndInvestment = CreateStartBetStatistics(winOddses, raceInvestmentDistributions.SingleOrDefault(r => r.RaceNumber == raceNumber))
                });
            }
        }

        private IList<StartBetStatistics> CreateStartBetStatistics(IList<WinOdds> winOdds, IList<PlaceOdds> placeOdds)
        {
            IEnumerable<int> startNumbers = winOdds.Select(o => o.StartNumber).Union(placeOdds.Select(o => o.StartNumber)).Distinct();

            return startNumbers.Select(startNumber => new StartBetStatistics
            {
                StartNumber = startNumber,
                WinOdds = winOdds.SingleOrDefault(o => o.StartNumber == startNumber)?.Odds,
                PlaceMinOdds = placeOdds.SingleOrDefault(o => o.StartNumber == startNumber)?.MinOdds,
                PlaceMaxOdds = placeOdds.SingleOrDefault(o => o.StartNumber == startNumber)?.MaxOdds
            }).ToList();
        }

        private IList<StartBetStatistics> CreateStartBetStatistics(IList<WinOdds> winOdds, RaceInvestmentDistribution investmentDistribution)
        {
            IEnumerable<int> startNumbers = winOdds.Select(s => s.StartNumber).Union(investmentDistribution?.Distribution.Select(r => r.StartNumber) ?? new int[0]).Distinct();

            return startNumbers.Select(startNumber => new StartBetStatistics
            {
                StartNumber = startNumber,
                WinOdds = winOdds.SingleOrDefault(s => s.StartNumber == startNumber)?.Odds,
                InvestmentPercentage = investmentDistribution?.Distribution.SingleOrDefault(d => d.StartNumber == startNumber)?.Percentage
            }).ToList();
        }
    }
}