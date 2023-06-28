using EcomDash.Models;
using EcomDash.Requests;
using EcomDash.Utils;
using System.Dynamic;

namespace EcomDash.Services
{
    public class OrdersService
    {
        EcommerceContext dbContext = new EcommerceContext();
        OrdersPaginationUtils paginationUtils = new OrdersPaginationUtils();

        public Customer getCustomerOrder(int orderId)
        {
            Customer customer = dbContext.Orders.Where(x => x.Id == orderId)
                .Select(x => x.Customer).FirstOrDefault();
            return customer;
        }

        public ExpandoObject getProductsOrder(int orderId)
        {
            List<Product> products = dbContext.OrderDetails.Where(x => x.Order.Id == orderId)
                .Select(x => x.Product).ToList();

            dynamic result = new ExpandoObject();
            result.Products = products;
            result.count = products.Count;
            return result;
        }

        public ExpandoObject getPaginatedOrders(string orderBy, string orderDirection, int currentPage = 1, int pageSize = 5)
        {
            return paginationUtils.GetPaginatedOrders(ref dbContext, orderBy, orderDirection, currentPage, pageSize);
        }

        public Order CreateOrder(OrderDto orderDto)
        {
            Customer customer = dbContext.Customers.Find(orderDto.CustomerId);

            var order = new Order
            {
                CustomerId = customer.Id,
                OrderDate = DateTime.Now,
                ShippingAddress = customer.DefaultShippingAddress,
                OrderAddress = orderDto.ShippingAddress,
                OrderEmail = customer.Email,
                OrderStatus = orderDto.OrderStatus
            };

            decimal totalAmount = 0;

            foreach (var productDto in orderDto.Products)
            {
                var product = dbContext.Products.Find(productDto.ProductId);
                if (product == null)
                {
                    throw new Exception($"Prodotto non trovato: {productDto.ProductId}");
                }

                var orderDetail = new OrderDetail
                {
                    ProductId = productDto.ProductId,
                };

                order.OrderDetails.Add(orderDetail);

                totalAmount += (decimal)(product.Price * Convert.ToDecimal(productDto.Quantity));
            }

            order.Amount = totalAmount;

            dbContext.Orders.Add(order);
            dbContext.SaveChanges();

            return order;
        }

        public Order UpdateOrder(int orderId, OrderDto orderDto)
        {
            Order order = dbContext.Orders.Find(orderId);

            if (order == null)
            {
                throw new Exception($"Ordine non trovato: {orderId}");
            }

            Customer customer = dbContext.Customers.Find(orderDto.CustomerId);

            if (customer == null)
            {
                throw new Exception($"Cliente non trovato: {orderDto.CustomerId}");
            }

            order.CustomerId = customer.Id;
            order.ShippingAddress = orderDto.ShippingAddress;
            order.OrderEmail = customer.Email;
            order.OrderStatus = orderDto.OrderStatus;


            List<OrderDetail> orderDetails = dbContext.OrderDetails.Where(x => x.OrderId == orderId).ToList();
            foreach (var orderDetail in orderDetails)
            {
                dbContext.OrderDetails.Remove(orderDetail);
            }

            decimal totalAmount = 0;

            foreach (var productDto in orderDto.Products)
            {
                var product = dbContext.Products.Find(productDto.ProductId);
                if (product == null)
                {
                    throw new Exception($"Prodotto non trovato: {productDto.ProductId}");
                }

                var orderDetail = new OrderDetail
                {
                    ProductId = productDto.ProductId,
                };

                order.OrderDetails.Add(orderDetail);

                totalAmount += (decimal)(product.Price * Convert.ToDecimal(productDto.Quantity));
            }

            order.Amount = totalAmount;

            dbContext.SaveChanges();

            return order;
        }
    }
}
