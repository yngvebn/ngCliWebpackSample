using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using EPiServer;
using EPiServer.Core;
using EPiServer.SpecializedProperties;
using Rikstoto.Toto.Epi.Pages.StartPage;

namespace Rikstoto.Toto.Features.Partials.Footer
{
    public class FooterController : Controller
    {
        private readonly IContentRepository _contentRepository;

        public FooterController(IContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }

        public PartialViewResult Index()
        {
            var startPage = _contentRepository.Get<StartPage>(ContentReference.StartPage);

            return PartialView("_Footer", startPage);
        }
    }
}