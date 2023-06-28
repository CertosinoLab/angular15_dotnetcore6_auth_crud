using EcomDash.Models;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;

namespace EcomDash.Utils
{
    public class CustomersPaginationUtils
    {
        public ExpandoObject GetPaginatedCustomers(ref EcommerceContext dbContext, string orderBy, string orderDirection,
           int currentPage = 1, int pageSize = 5)
        {
            IQueryable<Customer> query = dbContext.Customers.AsQueryable();
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

            List<Customer> customers = query
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            int customerFrom = (currentPage - 1) * pageSize + 1;
            int customerTo = customerFrom + pageSize - 1;
            if (customerTo > totalCount)
            {
                customerTo = totalCount;
            }

            dynamic result = new ExpandoObject();
            result.Customers = customers;
            result.CurrentPage = currentPage;
            result.PageSize = pageSize;
            result.TotalPages = totalPages;
            result.TotalCount = totalCount;
            result.CustomerFrom = customerFrom;
            result.CustomerTo = customerTo;

            return result;
        }

        private string GetValidSortingProperty(string propertyName)
        {
            List<string> validProperties = new List<string> { "Id", "Email", "Password", "FullName",
                "BillingAddress", "DefaultShippingAddress", "Country", "Phone" };

            if (validProperties.Contains(propertyName))
            {
                return propertyName;
            }

            return null;
        }

        private IQueryable<Customer> ApplySorting(IQueryable<Customer> query, string propertyToSortBy, string orderDirection)
        {
            if (orderDirection == "desc")
            {
                return query.OrderByDescending(p => EF.Property<object>(p, propertyToSortBy));
            }

            return query.OrderBy(p => EF.Property<object>(p, propertyToSortBy));
        }
    }
}
