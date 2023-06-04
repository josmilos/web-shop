using AutoMapper;
using WebShopAPI.Dto;
using WebShopAPI.Infrastructure;
using WebShopAPI.Interfaces;
using WebShopAPI.Models;

namespace WebShopAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;

        public ProductService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _dbContext = dbContext;
        }

        public ProductDto AddProduct(ProductDto newProduct)
        {
            User seller = _dbContext.Users.Find(newProduct.SellerId);
            Console.WriteLine(seller);
            Product product = _mapper.Map<Product>(newProduct);
            product.Seller = seller;
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
            return _mapper.Map<ProductDto>(product);
        }

        public bool DeleteProduct(int id)
        {
            try
            {
                Product product = _dbContext.Products.Find(id);
                _dbContext.Products.Remove(product);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        public ProductDto GetById(int id)
        {
            return _mapper.Map<ProductDto>(_dbContext.Products.Find(id));
        }

        public List<ProductDto> GetProducts()
        {
            return _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList());
        }

        public List<ProductDto> GetSellerProducts(int id)
        {
            List<ProductDto> allProducts= _mapper.Map<List<ProductDto>>(_dbContext.Products.ToList());
            List<ProductDto> sellerProducts = new List<ProductDto>();

            foreach(ProductDto product in allProducts)
            {
                if(product.SellerId == id)
                {
                    sellerProducts.Add(product);
                }
            }
            return sellerProducts;
        }

        public ProductDto UpdateProduct(int id, ProductDto newProductData)
        {
            Product product = _dbContext.Products.Find(id);
            product.Name = newProductData.Name;
            product.Description = newProductData.Description;
            product.Price = newProductData.Price;
            product.Quantity = newProductData.Quantity;
            product.Image = newProductData.Image;
            _dbContext.SaveChanges();

            return _mapper.Map<ProductDto>(product);
        }
    }
}
