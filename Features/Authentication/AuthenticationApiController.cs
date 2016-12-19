using System.Net.Http.Headers;
using System.Web.Http;
using Rikstoto.Service.CustomerManagementServiceContract;
using Rikstoto.Service.CustomerServiceContract;
using Rikstoto.Toto.Features.Authentication.Models;
using Rikstoto.Toto.Infrastructure;
using Rikstoto.Toto.Infrastructure.Routes;
using Rikstoto.Toto.Security;
using Rikstoto.Toto.Security.Attributes;
using Rikstoto.Toto.ServiceGateway;

namespace Rikstoto.Toto.Features.Authentication
{
    [RoutePrefix(ApiRoutes.Authentication.RoutePrefix)]
    public class AuthenticationApiController : ApiController
    {
        private readonly IAuthenticationContext _authenticationContext;
        private readonly ICustomerServiceGateway _customerServiceGateway;
        private readonly ICustomerProvider _customerProvider;

        public AuthenticationApiController(IAuthenticationContext authenticationContext, ICustomerServiceGateway customerServiceGateway, ICustomerProvider customerProvider)
        {
            _authenticationContext = authenticationContext;
            _customerServiceGateway = customerServiceGateway;
            _customerProvider = customerProvider;
        }

        [HttpGet]
        [Route(ApiRoutes.Authentication.IsLoggedIn)]
        public IHttpActionResult IsAuthenticated()
        {
            return Ok(RestResult<bool>.CreateSuccess(_authenticationContext.IsAuthenticated()));
        }

        [HttpGet]
        [CustomerAuthorize]
        [Route(ApiRoutes.Authentication.LoggedInUser)]
        public IHttpActionResult GetLoggedInUser()
        {
            Customer customer = _customerProvider.GetCurrentCustomer();

            var model = new LoggedInUser
            {
                Username = customer.Username,
                Segment = customer.Metadata.Segment.ToString(),
                CustomerKey = customer.Key.CustomerId
            };
            
            return Ok(RestResult<LoggedInUser>.CreateSuccess(model));
        }

        [HttpPost]
        [Route(ApiRoutes.Authentication.Login)]
        public IHttpActionResult Login(Credentials credentials)
        {
            if (string.IsNullOrEmpty(credentials.Password) || string.IsNullOrEmpty(credentials.Username))
                return Unauthorized(new AuthenticationHeaderValue(AuthenticationFault.InvalidCredentials.ToString()));

            var authenticationResult = _customerServiceGateway.AuthenticateUser(credentials.Username, credentials.Password);

            if (authenticationResult.Success)
            {
                _authenticationContext.SetAuthenticationCookie(credentials.Username, authenticationResult.Result.Key.CustomerId);

                return Ok(RestResult<string>.CreateSuccess(string.Empty));
            }

            AuthenticationFault authenticationFailure = authenticationResult.FaultCode.Value;

            if (authenticationFailure == AuthenticationFault.LogonAttemptsExceeded)
                return Unauthorized(new AuthenticationHeaderValue(authenticationFailure.ToString()));

            if (authenticationFailure == AuthenticationFault.AccountLocked)
                return Unauthorized(new AuthenticationHeaderValue(authenticationFailure.ToString()));

            return Unauthorized(new AuthenticationHeaderValue(AuthenticationFault.InvalidCredentials.ToString()));
        }

        [HttpPost]
        [Route(ApiRoutes.Authentication.Logout)]
        public IHttpActionResult Logout()
        {
            _authenticationContext.Logout();

            return Ok(RestResult<string>.CreateSuccess(string.Empty));
        }
    }
}