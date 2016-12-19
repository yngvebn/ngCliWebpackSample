using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.Ajax.Utilities;
using Rikstoto.Service.RaceDay.Contracts.PoolService;
using Rikstoto.Toto.Features.Game.Models;

namespace Rikstoto.Toto.Features.Game.RaceDay.ProductTimeline
{
    public class ProductTimelineViewModelPopulator : IProductTimelineViewModelPopulator
    {
        private readonly IMapper _mapper;

        public ProductTimelineViewModelPopulator(IMapper mapper)
        {
            _mapper = mapper;
        }
        
        public ProductsForTimeline Populate(GamesForRaceDay gamesForRaceDay)
        {
            ProductsForTimeline productsForTimeline = _mapper.Map<ProductsForTimeline>(gamesForRaceDay);

            List<ProductForTimeline> allProducts = new List<ProductForTimeline>();

            var activeMultiLegProductForTimelines = _mapper.Map<List<ActiveMultiLegProductForTimeline>>(gamesForRaceDay.MultiLegGames);

            foreach (var game in activeMultiLegProductForTimelines)
            {
                game.ProgressStatus = GetGameStatus(game, gamesForRaceDay.Races);
                game.ConsecutiveLegs = CalculateConsecutiveLegs(game).ToArray();
                game.EarliestRaceStart = (from race in gamesForRaceDay.Races
                                          where game.Races.Contains(race.RaceNumber)
                                          orderby race.StartTime
                                          select race.StartTime).First();
            }

            allProducts.AddRange(activeMultiLegProductForTimelines);

            List<ActiveSingleLegProductForTimeline> singleLegProducts = (from slg in gamesForRaceDay.SingleLegGames.DistinctBy(s => s.Product)
                                                                         let race = gamesForRaceDay.Races.Single(r => r.RaceNumber == slg.RaceNumber)
                                                                         let legs = gamesForRaceDay.SingleLegGames.Where(s => s.Product == slg.Product)
                                                                         select new ActiveSingleLegProductForTimeline()
                                                                         {
                                                                             Product = slg.Product,
                                                                             EarliestRaceStart = race.StartTime,
                                                                             Races = _mapper.Map<List<RaceForSingleLegGame>>(legs)
                                                                         }).ToList();

            allProducts.AddRange(singleLegProducts);
            allProducts.Sort();
            productsForTimeline.Products = allProducts;


            return productsForTimeline;
        }

        private ProgressStatus GetGameStatus(ActiveMultiLegProductForTimeline game, IList<Race> races)
        {
            List<Race> gameRaces = races.Where(x => game.Races.Contains(x.RaceNumber)).ToList();

            if (game.IsAbandoned)
                return ProgressStatus.Abandoned;

            if (gameRaces.All(x => x.ProgressStatus == ProgressStatus.Finished))
                return ProgressStatus.Finished;

            if (gameRaces.All(x => x.ProgressStatus == ProgressStatus.Future))
                return ProgressStatus.Future;

            return ProgressStatus.Ongoing;
        }

        private IEnumerable<ConsecutiveLegsForMultiLegGame> CalculateConsecutiveLegs(ActiveMultiLegProductForTimeline game)
        {
            int previousRace = game.Races.First();

            var consecutiveLegs = new ConsecutiveLegsForMultiLegGame
            {
                FromRaceNumber = previousRace,
                ToRaceNumber = previousRace
            };

            foreach (int currentRace in game.Races.Skip(1))
            {
                if (currentRace == previousRace + 1)
                {
                    consecutiveLegs.ToRaceNumber = currentRace;
                    previousRace = currentRace;
                }
                else
                {
                    yield return consecutiveLegs;

                    consecutiveLegs = new ConsecutiveLegsForMultiLegGame
                    {
                        FromRaceNumber = currentRace,
                        ToRaceNumber = currentRace
                    };

                    previousRace = currentRace;
                }
            }

            yield return consecutiveLegs;
        }
    }

}