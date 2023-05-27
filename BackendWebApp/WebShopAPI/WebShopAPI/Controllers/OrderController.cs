﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebShopAPI.Dto;
using WebShopAPI.Interfaces;

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

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderDto order)
        {
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
