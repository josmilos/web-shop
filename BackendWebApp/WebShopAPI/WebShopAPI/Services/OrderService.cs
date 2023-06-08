using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public List<OrderDto> GetSellerHistoryOrders(int id)
        {
            List<Order> orders = _dbContext.Orders.Include(o => o.OrderProducts).ToList();
            List<Order> myOrders = new List<Order>();
            List<Product> myProducts = _dbContext.Products.Where(p => p.SellerId == id).ToList();
            List<ProductOrder> myProductOrders = new List<ProductOrder>();

            
                foreach(Product product in myProducts)
                {
                    myProductOrders.AddRange(_dbContext.ProductOrders.Where(po => po.ProductId == product.ProductId).ToList());
            }
            
            foreach (ProductOrder po in myProductOrders)
            {
                myOrders.AddRange(_dbContext.Orders.Where(o => o.OrderId == po.OrderId).Include(o => o.OrderProducts).ToList());
            }

            myOrders = myOrders.Distinct().ToList();

            List<OrderDto> returnOrders = new List<OrderDto>();

            foreach (Order o in myOrders)
            {
                OrderDto returnOrder = _mapper.Map<OrderDto>(o);

                foreach (ProductOrder po in myProductOrders)
                {
                    if(returnOrder.OrderId == po.OrderId)
                    {
                        Product tempProduct = _dbContext.Products.Where(p => p.ProductId == po.ProductId).FirstOrDefault();
                        tempProduct.Quantity = po.ProductQuantity;
                        ProductDto productDto = _mapper.Map<ProductDto>(tempProduct);
                        returnOrder.Products.Add(productDto);
                    }
                    
                }
                returnOrders.Add(returnOrder);

            }


            return returnOrders;
        }

        public List<OrderDto> GetSellerNewOrders(int id)
        {
            throw new NotImplementedException();
        }

        public List<OrderDto> GetBuyerOrders(int id)
        {
            List<Order> orders = _dbContext.Orders.Where(o => o.UserBuyerId == id).Include(o => o.OrderProducts).ToList();
            List<ProductOrder> productOrders = _dbContext.ProductOrders.ToList();
            List<OrderDto> returnOrders = new List<OrderDto>();

            foreach(Order o in orders)
            {
                OrderDto returnOrder = _mapper.Map<OrderDto>(o);

                foreach (ProductOrder po in o.OrderProducts)
                {
                    Product tempProduct = _dbContext.Products.Where(p => p.ProductId == po.ProductId).FirstOrDefault();
                    tempProduct.Quantity = po.ProductQuantity;
                    ProductDto productDto = _mapper.Map<ProductDto>(tempProduct);
                    returnOrder.Products.Add(productDto);
                }
                returnOrders.Add(returnOrder);
                
            }
            

            return returnOrders;
        }
        public OrderDto EditStatusOrder(int id, OrderEditDto newOrderData)
        {
            
            Order order = _dbContext.Orders.Where(o => o.OrderId == id).Include(o => o.OrderProducts).FirstOrDefault();
            
            if(order == null)
            {
                Console.WriteLine("NE POSTOJI OVAJ ORDER");
                throw new NotImplementedException();
            }


            if (newOrderData == null)
            {
                Console.WriteLine("NEMA PODATAKA ZA EDITORDER");
                throw new NotImplementedException();
            }
            if (newOrderData.Status != string.Empty && newOrderData.Status != null)
            {
                // DODATI VALIDACIJE
                order.Status = newOrderData.Status;
            }

            if(order.Status == "cancelled")
            {
                List<ProductOrder> productsOrder = order.OrderProducts;
                foreach (ProductOrder productOrder in productsOrder) 
                {
                Product product = _dbContext.Products.Find(productOrder.ProductId);
                    if (product != null) 
                    {
                        product.Quantity = product.Quantity + productOrder.ProductQuantity;

                    }
                }
            }

            _dbContext.SaveChanges();
            return _mapper.Map<OrderDto>(order);
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
