using EcomDash.Models;
using EcomDash.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;

namespace EcomDash.Controllers
{
    [ApiController]
    [Route("api/customers")]
    public class CustomersController : ControllerBase
    {
        CustomersService customersService = new CustomersService();

        [Authorize(Roles = "Admin, User")]
        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            List<Customer> customers = customersService.GetAllCustomers();
            return Ok(customers);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("getpaginatedcustomers")]
        public IActionResult GetPaginatedCustomers(string orderBy = "Id", string orderDirection = "asc", int currentPage = 1, int pageSize = 5)
        {
            ExpandoObject result = customersService.getPaginatedCustomers(orderBy, orderDirection, currentPage, pageSize);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("createcustomer")]
        public IActionResult CreateCustomer(Customer customer)
        {
            Customer result = customersService.CreateCustomer(customer);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updatecustomer/{customerId}")]
        public IActionResult UpdateCustomer(int customerId, Customer customer)
        {
            Customer result = customersService.UpdateCustomer(customerId, customer);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deletecustomer/{customerId}")]
        public IActionResult DeleteCustomer(int customerId)
        {
            bool result = customersService.DeleteCustomer(customerId);
            return Ok(result);
        }
    }
}
