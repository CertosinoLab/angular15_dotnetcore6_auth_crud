namespace EcomDash.Models;

public partial class Order
{
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public decimal? Amount { get; set; }

    public string? ShippingAddress { get; set; }

    public string? OrderAddress { get; set; }

    public string? OrderEmail { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? OrderStatus { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
