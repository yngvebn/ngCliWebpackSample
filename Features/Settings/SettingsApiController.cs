using System.Web.Http;
using Rikstoto.Toto.Configuration;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using WebApi.OutputCache.V2;

namespace Rikstoto.Toto.Features.Settings
{
    [RoutePrefix(ApiRoutes.Settings.RoutePrefix)]
    public class SettingsApiController : ApiController
    {
        private readonly IUrlSettings _urlSettings;

        public SettingsApiController(IUrlSettings urlSettings)
        {
            _urlSettings = urlSettings;
        }

        [HttpGet]
        [CacheOutput(ClientTimeSpan = 86400)]
        [Route(ApiRoutes.Settings.ForgotPasswordUrl)]
        public IHttpActionResult GetForgotPasswordUrl()
        {
            return Ok(RestResult<string>.CreateSuccess(_urlSettings.ForgotPassword));
        }

        [HttpGet]
        [CacheOutput(ClientTimeSpan = 86400)]
        [Route(ApiRoutes.Settings.BetLimitUrl)]
        public IHttpActionResult GetBetLimitUrl()
        {
            return Ok(RestResult<string>.CreateSuccess(_urlSettings.BetLimit));
        }

        [HttpGet]
        [CacheOutput(ClientTimeSpan = 86400)]
        [Route(ApiRoutes.Settings.DepositUrl)]
        public IHttpActionResult GetDepositUrl()
        {
            return Ok(RestResult<string>.CreateSuccess(_urlSettings.Deposit));
        }

        [HttpGet]
        [CacheOutput(ClientTimeSpan = 86400)]
        [Route(ApiRoutes.Settings.RegisterUrl)]
        public IHttpActionResult GetRegisterUrl()
        {
            return Ok(RestResult<string>.CreateSuccess(_urlSettings.Register));
        }
    }
}