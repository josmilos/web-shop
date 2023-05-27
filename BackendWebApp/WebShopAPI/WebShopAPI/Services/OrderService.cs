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
            Order order = _mapper.Map<Order>(newOrder);
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            return _mapper.Map<OrderDto>(newOrder);
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
