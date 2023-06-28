namespace EcomDash.Requests
{
    public class OrderDto
    {
        public int CustomerId { get; set; }
        public string ShippingAddress { get; set; }
        public string OrderAddress { get; set; }
        public string OrderEmail { get; set; }
        public string OrderStatus { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}
