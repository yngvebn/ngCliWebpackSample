using Rikstoto.Service.RaceDay.Contracts.PoolService;
using Rikstoto.Toto.Features.Game.Models;

namespace Rikstoto.Toto.Features.Game.RaceDay.ProductTimeline
{
    public interface IProductTimelineViewModelPopulator
    {
        ProductsForTimeline Populate(GamesForRaceDay gamesForRaceDay);
    }
}