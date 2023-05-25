using WebShopAPI.Models;

namespace WebShopAPI.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public List<Product> Products { get; set; }
    }
}
