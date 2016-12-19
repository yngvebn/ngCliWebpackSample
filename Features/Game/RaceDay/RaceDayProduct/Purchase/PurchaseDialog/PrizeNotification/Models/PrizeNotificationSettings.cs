namespace Rikstoto.Toto.Features.PrizeNotification.Models
{
    public class PrizeNotificationSettings
    {
        public bool WantsSms { get; set; }
        public bool WantsEmail { get; set; }
        public bool HasRegisteredEmail { get; set; }
        public bool HasRegisteredMobile { get; set; }
        public string MyPageUrl { get; set; }
    }
}