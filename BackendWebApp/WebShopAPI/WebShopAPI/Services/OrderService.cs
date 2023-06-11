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

        public Dictionary<string, string> AddOrder(OrderDto newOrder)
        {

            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";

            Order order = _mapper.Map<Order>(newOrder);
            List<ProductDto> products = newOrder.Products;
            List<Product> dbProducts = _dbContext.Products.ToList();

            foreach(ProductDto product in products)
            {
                Product prod = _dbContext.Products.Find(product.ProductId);
                if(prod == null)
                {
                    response["statusCode"] = "400";
                    response["message"] = "Product " + product.Name + " does not exist in our database.";
                    return response;
                }
                else if(prod.Quantity < product.Quantity) 
                {
                    response["statusCode"] = "400";
                    response["message"] = "Product " + product.Name + " has only " + prod.Quantity + " available units.";
                    return response;
                }
            }

            foreach (ProductDto product in products)
            {
                ProductOrder productOrder = new ProductOrder() { OrderId = order.OrderId, ProductId = product.ProductId, ProductQuantity = product.Quantity, Order = order };
                _dbContext.ProductOrders.Add(productOrder);
                order.OrderProducts.Add(productOrder);
                Product dbProduct = _dbContext.Products.Find(product.ProductId);
                dbProduct.Quantity = dbProduct.Quantity - product.Quantity;
            }

            try
            {
                User buyer = _dbContext.Users.Find(order.UserBuyerId);
                order.UserBuyer = buyer;
            }
            catch(Exception ex)
            {
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;
            }
            
            

            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();

            return response;
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
            List<OrderDto> returnOrders = new List<OrderDto>();
            List<User> users = _dbContext.Users.Where(u => u.UserType == "buyer").ToList();

            foreach (User user in users)
            {
                returnOrders.AddRange(GetBuyerOrders(user.UserId));
            }
            return returnOrders;
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
        public Dictionary<string, string> EditStatusOrder(int id, OrderEditDto newOrderData)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";

            Order order = _dbContext.Orders.Where(o => o.OrderId == id).Include(o => o.OrderProducts).FirstOrDefault();
            
            if(order == null)
            {
                response["statusCode"] = "400";
                response["message"] = "This order does not exist";
                return response;
            }


            if (newOrderData == null)
            {
                response["statusCode"] = "500";
                response["message"] = "The server has encountered a situation it does not know how to handle.";
                return response;
            }
            if (newOrderData.Status != string.Empty && newOrderData.Status != null)
            {
                if(newOrderData.Status != "cancelled")
                {
                    response["statusCode"] = "400";
                    response["message"] = "There was an error with your request. Try again";
                }
                else
                {
                    order.Status = newOrderData.Status;
                }
                
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
            return response;
        }

        public Dictionary<string, string> UpdateOrder(int id, OrderDto newOrderData)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            response["statusCode"] = "200";
            response["message"] = "";

            Order order = _dbContext.Orders.Find(id);
            if(order == null) 
            {
                response["statusCode"] = "400";
                response["message"] = "Order with ID " + id + " does not exist!";
                return response;
            }

            order.Comment = newOrderData.Comment;
            order.Address = newOrderData.Address;

            return response;
        }
    }
}
