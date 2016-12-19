namespace Rikstoto.Toto.Features.Common.LinkProvider
{
    public interface IProductLinkProvider
    {
        string FindLinkForNextAvailableProduct(string value, string baselink);
    }
}