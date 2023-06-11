using AutoMapper;
using Azure;
using System.Text.RegularExpressions;
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

        public Dictionary<string, string> AddProduct(ProductDto newProduct)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";

            User seller = _dbContext.Users.Find(newProduct.SellerId);
            if (seller == null)
            {
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;
            }

            if (newProduct.Name == string.Empty || newProduct.Name == null)
            {
                response["statusCode"] = "400";
                response["message"] += "\nName must not be empty.";
            }
            else if (!Regex.IsMatch(newProduct.Name, @"^[a-zA-Z]+$"))
            {
                response["statusCode"] = "400";
                response["message"] += "\nName can not contain numbers.";
            }
            else if (newProduct.Name.Length < 2 || newProduct.Name.Length > 30)
            {
                response["statusCode"] = "400";
                response["message"] += "\nName length has to be between 2 and 30 characters";
            }

            if (newProduct.Description == string.Empty || newProduct.Description == null)
            {
                response["statusCode"] = "400";
                response["message"] += "\nDescription must not be empty.";
            }

            if (newProduct.Price <= 0)
            {
                response["statusCode"] = "400";
                response["message"] += "\nPrice of product can not be zero or less than zero.";
            }

            if (newProduct.Quantity < 0)
            {
                response["statusCode"] = "400";
                response["message"] += "\nProduct quantity can not be less than zero.";
            }

            if (newProduct.Image == null && newProduct.Image == string.Empty)
            {
                response["statusCode"] = "400";
                response["message"] += "\nProduct image must be uploaded.";
            }

                if (response["statusCode"] != "200")
            {
                return response;
            }

            Product product = _mapper.Map<Product>(newProduct);
            product.Seller = seller;
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return response;
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

        public Dictionary<string, string> UpdateProduct(int id, ProductDto newProductData)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";
            Product product = _dbContext.Products.Find(id);

            if (product == null)
            {
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;

            }
            if (newProductData.Name != null && newProductData.Name != string.Empty)
            {
                if (!Regex.IsMatch(newProductData.Name, @"^[a-zA-Z]+$"))
                {
                    response["statusCode"] = "400";
                    response["message"] += "\nName can not contain numbers.";
                }
                else if (newProductData.Name.Length < 2 || newProductData.Name.Length > 30)
                {
                    response["statusCode"] = "400";
                    response["message"] += "\nName length has to be between 2 and 30 characters";
                }
                else
                {
                    product.Name = newProductData.Name;
                }
                
            }
            if (newProductData.Description != null && newProductData.Description != string.Empty)
            {
                if (newProductData.Description.Length < 2 || newProductData.Description.Length > 30)
                {
                    response["statusCode"] = "400";
                    response["message"] += "\nDescription length has to be between 2 and 30 characters";
                }
                else
                {
                    product.Description = newProductData.Description;
                }
                
            }
            if (newProductData.Price != null && newProductData.Price.ToString() != string.Empty)
            {
                if(newProductData.Price <= 0)
                {
                    response["statusCode"] = "400";
                    response["message"] += "\nPrice of product can not be zero or less than zero.";
                }
                else 
                { 
                    product.Price = newProductData.Price; 
                }
                
            }
            if (newProductData.Quantity != null && newProductData.Quantity.ToString() != string.Empty)
            {
                if(newProductData.Quantity < 0)
                {
                    response["statusCode"] = "400";
                    response["message"] += "\nProduct quantity can not be less than zero.";
                }
                else
                {
                    product.Quantity = newProductData.Quantity;
                }
                
            }
            if (newProductData.Image != null && newProductData.Image != string.Empty)
            {
                product.Image = newProductData.Image;
            }

            if (response["statusCode"] != "200")
            {
                return response;
            }

            _dbContext.SaveChanges();

            return response;
        }
    }
}
