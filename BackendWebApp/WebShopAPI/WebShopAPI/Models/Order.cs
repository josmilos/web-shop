namespace WebShopAPI.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public List<Product> Products { get; set; }
    }
}
