using System;
using System.Web.Http;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.ServiceGateway;
using WebApi.OutputCache.V2;

namespace Rikstoto.Toto.Features.Common.BetDate
{
    [RoutePrefix(ApiRoutes.BetDate.RoutePrefix)]
    public class BetDateApiController : ApiController
    {
        private readonly IBetDateProvider _betDateProvider;

        public BetDateApiController(IBetDateProvider betDateProvider)
        {
            _betDateProvider = betDateProvider;
        }

        [HttpGet]
        [Route(ApiRoutes.BetDate.Now)]
        public IHttpActionResult GetBetDateNow()
        {
            return Ok(RestResult<DateTime>.CreateSuccess(_betDateProvider.Now));
        }
        
        [HttpGet]
        [AllowAnonymous]
        [CacheOutput(ClientTimeSpan = 60)]
        [Route(ApiRoutes.BetDate.Today)]
        public IHttpActionResult GetBetDateToday()
        {
            return Ok(RestResult<DateTime>.CreateSuccess(_betDateProvider.Today));
        }
    }
}