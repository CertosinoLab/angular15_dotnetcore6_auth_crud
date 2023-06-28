using EcomDash.Models;
using EcomDash.Requests;
using EcomDash.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace EcomDash.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        OrdersService ordersService = new OrdersService();
        EcommerceContext _context = new EcommerceContext();

        [Authorize(Roles = "Admin, User")]
        [HttpGet("ordercustomer/{orderId}")]
        public IActionResult GetCustomerOrder(int orderId)
        {
            Customer customer = ordersService.getCustomerOrder(orderId);
            return Ok(customer);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("getpaginatedorders")]
        public IActionResult GetPaginatedOrders(string orderBy = "Id", string orderDirection = "asc", int currentPage = 1, int pageSize = 5)
        {
            ExpandoObject result = ordersService.getPaginatedOrders(orderBy, orderDirection, currentPage, pageSize);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("geproductsdorder/{orderId}")]
        public IActionResult GetProductsOrder(int orderId)
        {
            ExpandoObject result = ordersService.getProductsOrder(orderId);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("createorder")]
        public IActionResult CreateOrder([FromBody] OrderDto orderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var order = ordersService.CreateOrder(orderDto);

                var jsonOptions = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve
                };

                var serializedOrder = JsonSerializer.Serialize(order, jsonOptions);

                return Ok(serializedOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("updateorder/{orderId}")]
        public IActionResult UpdateOrder(int orderId, [FromBody] OrderDto orderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var order = ordersService.UpdateOrder(orderId, orderDto);

                var jsonOptions = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve
                };

                var serializedOrder = JsonSerializer.Serialize(order, jsonOptions);

                return Ok(serializedOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}
