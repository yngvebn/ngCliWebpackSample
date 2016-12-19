using System.Web.Mvc;
using Rikstoto.Toto.Features.Shared;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.Security.Attributes;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.MyPage
{
    
    [RoutePrefix(Routes.MyPage.RoutePrefix)]
    public class MyPageController : BaseController
    {
        private readonly IBetDateProvider _betdateProvider;

        public MyPageController(IBetDateProvider betdateProvider)
        {
            _betdateProvider = betdateProvider;
        }

        [CustomerAuthorize]
        [Route("")]
        public ActionResult Index()
        {
            var date = _betdateProvider.Now;

            return View(date);
        }
        [Route(Routes.MyPage.MyAccount)]
        public ActionResult MyAccount()
        {
            return View();
        }
    }
}

