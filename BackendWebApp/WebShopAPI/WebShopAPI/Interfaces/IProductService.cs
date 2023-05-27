using WebShopAPI.Dto;

namespace WebShopAPI.Interfaces
{
    public interface IProductService
    {
        List<ProductDto> GetProducts();
        ProductDto GetById(int id);
        ProductDto AddProduct(ProductDto newProduct);
        ProductDto UpdateProduct(int id, ProductDto newProductData);
        bool DeleteProduct(int id);
    }
}
