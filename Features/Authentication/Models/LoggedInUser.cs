using Rikstoto.Service.SharedContracts;

namespace Rikstoto.Toto.Features.Authentication.Models
{
    public class LoggedInUser
    {
        public string Username { get; set; }
        public string Segment { get; set; }
        public int CustomerKey { get; set; }
    }
}