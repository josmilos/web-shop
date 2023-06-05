using WebShopAPI.Models;

namespace WebShopAPI.Dto
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }

        public DateTime OrderDate { get; set; }
        public int USerBuyerId { get; set; }
        public double TotalAmount { get; set; }
        public string Status { get; set; }
        public DateTime DeliveryTime { get; set; }
        public List<int> Products { get; set; }
    }
}
