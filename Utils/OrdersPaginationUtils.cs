using EcomDash.Models;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;

namespace EcomDash.Utils
{
    public class OrdersPaginationUtils
    {
        public ExpandoObject GetPaginatedOrders(ref EcommerceContext dbContext, string orderBy, string orderDirection,
           int currentPage = 1, int pageSize = 5)
        {
            IQueryable<Order> query = dbContext.Orders.AsQueryable();
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

            List<Order> orders = query
            .Skip((currentPage - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new Order
            {
                Id = o.Id,
                Amount = o.Amount,
                ShippingAddress = o.ShippingAddress,
                OrderAddress = o.OrderAddress,
                OrderDate = o.OrderDate,
                OrderStatus = o.OrderStatus,
                Customer = new Customer
                {
                    Id = o.Customer.Id,
                    FullName = o.Customer.FullName,
                    BillingAddress = o.Customer.BillingAddress,
                    Country = o.Customer.Country,
                    DefaultShippingAddress = o.Customer.DefaultShippingAddress,
                    Email = o.Customer.Email,
                    Phone = o.Customer.Phone,
                },

            })
            .ToList();

            int orderFrom = (currentPage - 1) * pageSize + 1;
            int orderTo = orderFrom + pageSize - 1;
            if (orderTo > totalCount)
            {
                orderTo = totalCount;
            }

            dynamic result = new ExpandoObject();
            result.Orders = orders;
            result.CurrentPage = currentPage;
            result.PageSize = pageSize;
            result.TotalPages = totalPages;
            result.TotalCount = totalCount;
            result.OrderFrom = orderFrom;
            result.OrderTo = orderTo;

            return result;
        }

        private string GetValidSortingProperty(string propertyName)
        {
            List<string> validProperties = new List<string> { "Id", "Customer", "Amount", "ShippingAddress",
                "OrderAddress", "OrderEmail", "OrderDate", "OrderStatus" };

            if (validProperties.Contains(propertyName))
            {
                return propertyName;
            }

            return null;
        }

        private IQueryable<Order> ApplySorting(IQueryable<Order> query, string propertyToSortBy, string orderDirection)
        {
            if (orderDirection == "desc")
            {
                return query.OrderByDescending(p => EF.Property<object>(p, propertyToSortBy));
            }

            return query.OrderBy(p => EF.Property<object>(p, propertyToSortBy));
        }
    }
}
