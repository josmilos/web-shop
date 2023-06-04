using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShopAPI.Dto;
using WebShopAPI.Interfaces;
using WebShopAPI.Services;

namespace WebShopAPI.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_productService.GetProducts());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_productService.GetById(id));
        }

        [HttpGet("seller-products/{id}")]
        public IActionResult GetSellerItems(int id)
        {
            return Ok(_productService.GetSellerProducts(id));
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductDto product)
        {
            return Ok(_productService.AddProduct(product));
        }

        [HttpPatch("{id}")]
        public IActionResult ChangeProduct(int id, [FromBody] ProductDto product)
        {
            return Ok(_productService.UpdateProduct(id, product));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            return Ok(_productService.DeleteProduct(id));
        }
    }
}
