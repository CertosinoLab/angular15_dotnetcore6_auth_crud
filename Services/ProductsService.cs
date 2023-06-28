using EcomDash.Models;
using EcomDash.Utils;
using System.Dynamic;

namespace EcomDash.Services
{
    public class ProductsService
    {
        EcommerceContext dbContext = new EcommerceContext();
        ProductsPaginationUtils paginationUtils = new ProductsPaginationUtils();
        public List<Product> GetAllProducts()
        {
            var products = dbContext.Products.ToList();
            return products;
        }

        public List<Product> GetProductByCategory(int categoryId)
        {
            var products = dbContext.Products
            .Where(p => p.ProductCategories.Any(pc => pc.CategoryId == categoryId))
            .ToList();
            return products;
        }

        public ExpandoObject getPaginatedProducts(string orderBy, string orderDirection, int currentPage = 1, int pageSize = 5)
        {
            return paginationUtils.GetPaginatedProducts(ref dbContext, orderBy, orderDirection, currentPage, pageSize);
        }

        public ExpandoObject getOrdersProduct(int productId)
        {
            List<Order> orders = dbContext.OrderDetails.Where(x => x.Product.Id == productId)
                .Select(x => x.Order).ToList();

            dynamic result = new ExpandoObject();
            result.Orders = orders;
            result.count = orders.Count;
            return result;
        }

        public Product CreateProduct(Product newProduct)
        {
            dbContext.Products.Add(newProduct);
            dbContext.SaveChanges();
            return newProduct;
        }

        public Product UpdateProduct(int productId, Product updatedProduct)
        {
            var existingProduct = dbContext.Products.Find(productId);
            if (existingProduct == null)
            {
                return null;
            }

            existingProduct.Name = updatedProduct.Name;
            existingProduct.Sku = updatedProduct.Sku;
            existingProduct.Price = updatedProduct.Price;
            existingProduct.Weight = updatedProduct.Weight;
            existingProduct.Description = updatedProduct.Description;
            existingProduct.Thumbnail = updatedProduct.Thumbnail;
            existingProduct.Image = updatedProduct.Image;
            existingProduct.CreateDate = updatedProduct.CreateDate;
            existingProduct.Stock = updatedProduct.Stock;

            dbContext.SaveChanges();
            return existingProduct;
        }

        public bool DeleteProduct(int productId)
        {
            var product = dbContext.Products.Find(productId);
            if (product == null)
            {
                return false;
            }

            dbContext.Products.Remove(product);
            dbContext.SaveChanges();
            return true;
        }
    }
}
