using EcomDash.Models;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;

namespace EcomDash.Utils
{
    public class ProductsPaginationUtils
    {
        public ExpandoObject GetPaginatedProducts(ref EcommerceContext dbContext, string orderBy, string orderDirection,
            int currentPage = 1, int pageSize = 5)
        {
            IQueryable<Product> query = dbContext.Products.AsQueryable();
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

            List<Product> products = query
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            int productFrom = (currentPage - 1) * pageSize + 1;
            int productTo = productFrom + pageSize - 1;
            if (productTo > totalCount)
            {
                productTo = totalCount;
            }

            dynamic result = new ExpandoObject();
            result.Products = products;
            result.CurrentPage = currentPage;
            result.PageSize = pageSize;
            result.TotalPages = totalPages;
            result.TotalCount = totalCount;
            result.ProductFrom = productFrom;
            result.ProductTo = productTo;

            return result;
        }

        private string GetValidSortingProperty(string propertyName)
        {
            List<string> validProperties = new List<string> { "Id", "Sku", "Name", "Price", "Weight", "Description", "CreateDate", "Stock" };

            if (validProperties.Contains(propertyName))
            {
                return propertyName;
            }

            return null;
        }

        private IQueryable<Product> ApplySorting(IQueryable<Product> query, string propertyToSortBy, string orderDirection)
        {
            if (orderDirection == "desc")
            {
                return query.OrderByDescending(p => EF.Property<object>(p, propertyToSortBy));
            }

            return query.OrderBy(p => EF.Property<object>(p, propertyToSortBy));
        }
    }
}
