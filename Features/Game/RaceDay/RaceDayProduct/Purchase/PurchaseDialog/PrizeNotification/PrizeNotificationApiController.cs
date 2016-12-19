using System;
using System.Web.Http;
using Rikstoto.Service.CustomerServiceContract;
using Rikstoto.Service.PrizeNotificationServiceContracts;
using Rikstoto.Toto.Configuration;
using Rikstoto.Toto.Features.PrizeNotification.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.Security;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.PrizeNotification
{
    [RoutePrefix(ApiRoutes.Settings.RoutePrefix)]
    public class PrizeNotificationApiController : ApiController
    {
        private readonly IPrizeNotificationServiceGateway _prizeNotificationGateway;
        private readonly ICustomerProvider _customerProvider;
        private readonly IUrlSettings _urlSettings;

        public PrizeNotificationApiController(ICustomerProvider customerProvider, IUrlSettings urlSettings, IPrizeNotificationServiceGateway prizeNotificationGateway)
        {
            _customerProvider = customerProvider;
            _urlSettings = urlSettings;
            _prizeNotificationGateway = prizeNotificationGateway;
        }

        [HttpGet]
        [Route(ApiRoutes.Settings.PrizeNotification)]
        public IHttpActionResult GetSettings()
        {
            Customer currentCustomer = _customerProvider.GetCurrentCustomer();

            if (currentCustomer == null)
                return Ok(RestResult<string>.CreateFailed());

            PrizeNotificationCustomerSettings prizeNotifications = _prizeNotificationGateway.GetCustomerSettings(currentCustomer.Key);

            return Ok(RestResult<PrizeNotificationSettings>.CreateSuccess(new PrizeNotificationSettings
            {
                WantsSms = prizeNotifications.SendSms,
                WantsEmail = prizeNotifications.SendEmail,
                HasRegisteredEmail = !String.IsNullOrEmpty(currentCustomer.EmailAddress),
                HasRegisteredMobile = !String.IsNullOrEmpty(currentCustomer.MobileNumber),
                MyPageUrl = _urlSettings.MyPage
            }));
        }
    }
}