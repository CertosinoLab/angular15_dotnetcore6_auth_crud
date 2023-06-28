using EcomDash.Models;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;

namespace EcomDash.Utils
{
    public class EmployeesPaginationUtils
    {
        public ExpandoObject GetPaginatedEmployees(ref EcommerceContext dbContext, string orderBy, string orderDirection,
          int currentPage = 1, int pageSize = 5)
        {
            IQueryable<Employee> query = dbContext.Employees.AsQueryable();
            if (!string.IsNullOrEmpty(orderBy))
            {
                string propertyToSortBy = GetValidSortingProperty(orderBy);
                if (!string.IsNullOrEmpty(propertyToSortBy))
                {
                    query = ApplySorting(query, propertyToSortBy, orderDirection);
                }
            }

            int totalCount = query.Count();
            int totalPages = 0;
            if (totalCount % pageSize == 0) totalPages = totalCount / pageSize;
            else totalPages = (totalCount / pageSize) + 1;

            List<Employee> employees = query
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            int employeeFrom = (currentPage - 1) * pageSize + 1;
            int employeeTo = employeeFrom + pageSize - 1;
            if (employeeTo > totalCount)
            {
                employeeTo = totalCount;
            }

            dynamic result = new ExpandoObject();
            result.Employees = employees;
            result.CurrentPage = currentPage;
            result.PageSize = pageSize;
            result.TotalPages = totalPages;
            result.TotalCount = totalCount;
            result.EmployeeFrom = employeeFrom;
            result.EmployeeTo = employeeTo;

            return result;
        }

        private string GetValidSortingProperty(string propertyName)
        {
            List<string> validProperties = new List<string> { "Id", "FullName", "Address", "Phone", "Job", "Role", "Salary" };

            if (validProperties.Contains(propertyName))
            {
                return propertyName;
            }

            return null;
        }

        private IQueryable<Employee> ApplySorting(IQueryable<Employee> query, string propertyToSortBy, string orderDirection)
        {
            if (orderDirection == "desc")
            {
                return query.OrderByDescending(p => EF.Property<object>(p, propertyToSortBy));
            }

            return query.OrderBy(p => EF.Property<object>(p, propertyToSortBy));
        }
    }
}

