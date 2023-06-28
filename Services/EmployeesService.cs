using EcomDash.Models;
using EcomDash.Utils;
using System.Dynamic;

namespace EcomDash.Services
{
    public class EmployeesService
    {
        EcommerceContext dbContext = new EcommerceContext();
        EmployeesPaginationUtils paginationUtils = new EmployeesPaginationUtils();
        public ExpandoObject getPaginatedEmployees(string orderBy, string orderDirection, int currentPage = 1, int pageSize = 5)
        {
            return paginationUtils.GetPaginatedEmployees(ref dbContext, orderBy, orderDirection, currentPage, pageSize);
        }
        public Employee CreateEmployee(Employee newEmployee)
        {
            dbContext.Employees.Add(newEmployee);
            dbContext.SaveChanges();
            return newEmployee;
        }

        public Employee UpdateEmployee(int employeeId, Employee updatedEmployee)
        {
            var existingEmployee = dbContext.Employees.Find(employeeId);
            if (existingEmployee == null)
            {
                return null;
            }

            existingEmployee.FullName = updatedEmployee.FullName;
            existingEmployee.Address = updatedEmployee.Address;
            existingEmployee.Phone = updatedEmployee.Phone;
            existingEmployee.Job = updatedEmployee.Job;
            existingEmployee.Salary = updatedEmployee.Salary;
            existingEmployee.Role = updatedEmployee.Role;

            dbContext.SaveChanges();
            return existingEmployee;
        }

        public bool DeleteEmployee(int employeeId)
        {
            var employee = dbContext.Employees.Find(employeeId);
            if (employee == null)
            {
                return false;
            }

            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();
            return true;
        }
    }
}
