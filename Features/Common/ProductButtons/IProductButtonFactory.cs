using System.Collections.Generic;
using Rikstoto.Toto.Features.Common.ProductButtons.Models;

namespace Rikstoto.Toto.Features.Common.ProductButtons
{
    public interface IProductButtonFactory
    {
        IList<ProductButton> GetFeaturedProductButtons();
    }
}
