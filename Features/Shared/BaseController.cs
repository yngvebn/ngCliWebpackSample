using System;
using System.Linq.Expressions;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Routing;
using Rikstoto.Toto.Infrastructure.Filters;

namespace Rikstoto.Toto.Features.Shared
{
    [SetLayout]
    public class BaseController : Controller
    {
        protected string ViewUrl<TController>(Expression<Func<TController, ActionResult>> method, bool includeHostAndScheme = false)
            where TController : Controller
        {
            var methodCallExpression = (method.Body as MethodCallExpression);
            if (methodCallExpression == null) throw new Exception("Not a method");

            var action = methodCallExpression.Method;
            var arguments = methodCallExpression.Arguments;
            var methodParameters = action.GetParameters();
            var routeAttribute = action.GetCustomAttribute<System.Web.Mvc.RouteAttribute>();

            if (routeAttribute == null || string.IsNullOrEmpty(routeAttribute.Name))
            {
                throw new Exception("Missing RouteAttribute with Name");
            }

            var routeParams = new RouteValueDictionary();
            for (int i = 0; i < methodParameters.Length; i++)
            {
                LambdaExpression lambda = Expression.Lambda(arguments[i]);
                var val = lambda.Compile().DynamicInvoke();
                routeParams.Add(methodParameters[i].Name, val);
            }

            return Url.RouteUrl(routeAttribute.Name, routeParams);
        }
    }
}