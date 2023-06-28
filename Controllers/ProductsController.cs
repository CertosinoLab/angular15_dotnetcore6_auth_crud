using EcomDash.Models;
using EcomDash.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Dynamic;

namespace EcomDash.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        ProductsService productsService = new ProductsService();

        [Authorize(Roles = "Admin, User")]
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            List<Product> products = productsService.GetAllProducts();
            return Ok(products);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("category/{categoryId}")]
        public IActionResult GetProductByCategory(int categoryId)
        {
            List<Product> products = productsService.GetProductByCategory(categoryId);
            return Ok(products);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("getpaginatedproducts")]
        public IActionResult GetPaginatedProducts(string orderBy = "Id", string orderDirection = "asc", int currentPage = 1, int pageSize = 5)
        {
            ExpandoObject result = productsService.getPaginatedProducts(orderBy, orderDirection, currentPage, pageSize);
            return Ok(result);
        }

        [Authorize(Roles = "Admin, User")]
        [HttpGet("getordersproduct/{productId}")]
        public IActionResult GetOrdersProduct(int productId)
        {
            ExpandoObject result = productsService.getOrdersProduct(productId);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("createproduct")]
        public IActionResult CreateProduct(Product product)
        {
            Product result = productsService.CreateProduct(product);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updateproduct/{productId}")]
        public IActionResult UpdateProduct(int productId, Product product)
        {
            Product result = productsService.UpdateProduct(productId, product);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteproduct/{productId}")]
        public IActionResult DeleteProduct(int productId)
        {
            bool result = productsService.DeleteProduct(productId);
            return Ok(result);
        }
    }
}
