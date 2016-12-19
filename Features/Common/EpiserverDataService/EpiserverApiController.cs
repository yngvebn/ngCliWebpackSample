using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using EPiServer;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using Rikstoto.Toto.Epi.Pages.StartPage;
using Rikstoto.Toto.Features.Common.EpiserverDataService;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway.Caching;

namespace Rikstoto.Toto.Features.Common.EpiDataService
{
    [RoutePrefix(ApiRoutes.Episerver.RoutePrefix)]
    public class EpiApiController : ApiController
    {
        private readonly IContentRepository _contentRepository;
        private readonly IServiceLocator _serviceLocator;


        public EpiApiController(IContentRepository contentRepository, IServiceLocator serviceLocator)
        {
            _contentRepository = contentRepository;
            _serviceLocator = serviceLocator;
        }

        [Route(ApiRoutes.Episerver.CustomerSupportLinks)]
        public IHttpActionResult GetCustomerSupportLinks()
        {
            var startPage = _contentRepository.Get<StartPage>(ContentReference.StartPage);
            var urlResolver = _serviceLocator.GetInstance<UrlResolver>();

            if (ContentReference.IsNullOrEmpty(startPage.ContentLink) || startPage.AdditionalCustomerSupportLinks == null)
                return NotFound();

            var model = startPage.AdditionalCustomerSupportLinks.Select(x => new CustomerSupportLink
                {
                    Title = x.Title,
                    Target = x.Target,
                    Href = urlResolver.GetUrl(x.Href)
                })
                .ToList();

            return Ok(RestResult<IList<CustomerSupportLink>>.CreateSuccess(model));
        }
    }
}