using EcomDash.Models;
using EcomDash.Utils;
using System.Dynamic;

namespace EcomDash.Services
{
    public class CustomersService
    {
        EcommerceContext dbContext = new EcommerceContext();
        CustomersPaginationUtils paginationUtils = new CustomersPaginationUtils();
        public List<Customer> GetAllCustomers()
        {
            var customers = dbContext.Customers.ToList();
            return customers;
        }

        public ExpandoObject getPaginatedCustomers(string orderBy, string orderDirection, int currentPage = 1, int pageSize = 5)
        {
            return paginationUtils.GetPaginatedCustomers(ref dbContext, orderBy, orderDirection, currentPage, pageSize);
        }

        public Customer CreateCustomer(Customer newCustomer)
        {
            dbContext.Customers.Add(newCustomer);
            dbContext.SaveChanges();
            return newCustomer;
        }

        public Customer UpdateCustomer(int customerId, Customer updatedCustomer)
        {
            var existingCustomer = dbContext.Customers.Find(customerId);
            if (existingCustomer == null)
            {
                return null;
            }

            existingCustomer.FullName = updatedCustomer.FullName;
            existingCustomer.Email = updatedCustomer.Email;
            existingCustomer.Password = updatedCustomer.Password;
            existingCustomer.BillingAddress = updatedCustomer.BillingAddress;
            existingCustomer.DefaultShippingAddress = updatedCustomer.DefaultShippingAddress;
            existingCustomer.Country = updatedCustomer.Country;
            existingCustomer.Phone = updatedCustomer.Phone;

            dbContext.SaveChanges();
            return existingCustomer;
        }

        public bool DeleteCustomer(int customerId)
        {
            var customer = dbContext.Customers.Find(customerId);
            if (customer == null)
            {
                return false;
            }

            var orders = dbContext.Orders.Where(o => o.CustomerId == customerId).ToList();
            foreach (var order in orders)
            {
                var orderDetails = dbContext.OrderDetails.Where(od => od.OrderId == order.Id).ToList();
                dbContext.OrderDetails.RemoveRange(orderDetails);
            }
            dbContext.Orders.RemoveRange(orders);

            dbContext.Customers.Remove(customer);
            dbContext.SaveChanges();
            return true;
        }
    }
}
