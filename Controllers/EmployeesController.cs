using EcomDash.Models;
using EcomDash.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;

namespace EcomDash.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeesController : ControllerBase
    {
        EmployeesService employeesService = new EmployeesService();

        [Authorize(Roles = "Admin, User")]
        [HttpGet("getpaginatedemployees")]
        public IActionResult GetPaginatedEmployees(string orderBy = "Id", string orderDirection = "asc", int currentPage = 1, int pageSize = 5)
        {
            ExpandoObject result = employeesService.getPaginatedEmployees(orderBy, orderDirection, currentPage, pageSize);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("createemployee")]
        public IActionResult CreateEmployee(Employee employee)
        {
            Employee result = employeesService.CreateEmployee(employee);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updateemployee/{employeeId}")]
        public IActionResult UpdateEmployee(int employeeId, Employee employee)
        {
            Employee result = employeesService.UpdateEmployee(employeeId, employee);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteemployee/{employeeId}")]
        public IActionResult DeleteEmployee(int employeeId)
        {
            bool result = employeesService.DeleteEmployee(employeeId);
            return Ok(result);
        }
    }
}
