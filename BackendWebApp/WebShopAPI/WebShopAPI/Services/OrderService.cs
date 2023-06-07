using AutoMapper;
using WebShopAPI.Dto;
using WebShopAPI.Infrastructure;
using WebShopAPI.Interfaces;
using WebShopAPI.Models;

namespace WebShopAPI.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly WebShopDbContext _dbContext;

        public OrderService(IMapper mapper, IConfiguration config, WebShopDbContext dbContext)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _dbContext = dbContext;
        }

        public OrderDto AddOrder(OrderDto newOrder)
        {
            Console.WriteLine(newOrder);
            Order order = _mapper.Map<Order>(newOrder);
            List<ProductDto> products = newOrder.Products;
            List<Product> dbProducts = _dbContext.Products.ToList();

            foreach (ProductDto product in products)
            {
                ProductOrder productOrder = new ProductOrder() { OrderId = order.OrderId, ProductId = product.ProductId, ProductQuantity = product.Quantity, Order = order };
                _dbContext.ProductOrders.Add(productOrder);
                order.OrderProducts.Add(productOrder);
                Console.Write(product.ProductId);
                Product dbProduct = _dbContext.Products.Find(product.ProductId);
                Console.Write(dbProduct);
                dbProduct.Quantity = dbProduct.Quantity - product.Quantity;
            }

            User buyer = _dbContext.Users.Find(order.UserBuyerId);
            order.UserBuyer = buyer;
            

            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            return _mapper.Map<OrderDto>(order);
        }

        public bool DeleteOrder(int id)
        {
            try
            {
                Order order = _dbContext.Orders.Find(id);
                _dbContext.Orders.Remove(order);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        public OrderDto GetById(int id)
        {
            return _mapper.Map<OrderDto>(_dbContext.Orders.Find(id));

        }

        public List<OrderDto> GetOrders()
        {
            return _mapper.Map<List<OrderDto>>(_dbContext.Orders.ToList());
        }

        public List<OrderDto> GetSellerDeliveredOrders(int id)
        {
            throw new NotImplementedException();
        }

        public List<OrderDto> GetSellerPendingOrders(int id)
        {
            throw new NotImplementedException();
        }

        public OrderDto UpdateOrder(int id, OrderDto newOrderData)
        {
            Order order = _dbContext.Orders.Find(id);
            order.Comment = newOrderData.Comment;
            order.Address = newOrderData.Address;

            _dbContext.SaveChanges();
            return _mapper.Map<OrderDto>(order);
        }
    }
}
