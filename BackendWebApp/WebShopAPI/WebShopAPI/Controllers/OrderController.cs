using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShopAPI.Dto;
using WebShopAPI.Interfaces;
using WebShopAPI.Services;

namespace WebShopAPI.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_orderService.GetOrders());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_orderService.GetById(id));
        }

        [HttpGet("new-seller/{id}")]
        public IActionResult GetSellerPendingOrders(int id)
        {
            return Ok(_orderService.GetSellerNewOrders(id));
        }

        [HttpGet("history-seller/{id}")]
        public IActionResult GetSellerDeliveredOrders(int id)
        {
            return Ok(_orderService.GetSellerHistoryOrders(id));
        }

        [HttpGet("history-buyer/{id}")]
        public IActionResult GetBuyerOrders(int id)
        {
            return Ok(_orderService.GetBuyerOrders(id));
        }

        [HttpPatch("{id}")]
        public IActionResult EditOrder(int id, [FromBody] OrderEditDto order)
        {
            return Ok(_orderService.EditStatusOrder(id, order));
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderDto order)
        {
            Console.WriteLine("STIGAO");
            return Ok(_orderService.AddOrder(order));
        }

        [HttpPut("{id}")]
        public IActionResult ChangeOrder(int id, [FromBody] OrderDto order)
        {
            return Ok(_orderService.UpdateOrder(id, order));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            if(_orderService.DeleteOrder(id))
            {
                return Ok(_orderService.DeleteOrder(id));
            }
            return Ok(_orderService.DeleteOrder(id));
        }
    }
}
