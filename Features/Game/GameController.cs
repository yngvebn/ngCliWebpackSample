using System.Web.Mvc;
using Rikstoto.Toto.Features.Common.LinkProvider;
using Rikstoto.Toto.Features.Shared;

namespace Rikstoto.Toto.Features.Game
{
    [RoutePrefix("Spill")]
    public class GameController : BaseController
    {
        private readonly IProductLinkProvider _gameLinkProvider;

        public GameController(IProductLinkProvider gameLinkProvider)
        {
            _gameLinkProvider = gameLinkProvider;
        }

        [Route("", Name = "Index")]
        public ActionResult Index()
        {
            return View();
        }
        
        [Route("{product}")]
        public ActionResult Product(string product)
        {
            string baseLink = ViewUrl<GameController>(x => x.Index());

            string productLink = _gameLinkProvider.FindLinkForNextAvailableProduct(product, baseLink);

            if (string.IsNullOrEmpty(productLink))
                return Redirect(baseLink);

            return Redirect(productLink);
        }
    }
}