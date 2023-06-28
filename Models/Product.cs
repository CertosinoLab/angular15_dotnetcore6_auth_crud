namespace EcomDash.Models;

public partial class Product
{
    public int Id { get; set; }

    public string? Sku { get; set; }

    public string? Name { get; set; }

    public decimal? Price { get; set; }

    public decimal? Weight { get; set; }

    public string? Description { get; set; }

    public string? Thumbnail { get; set; }

    public string? Image { get; set; }

    public DateTime? CreateDate { get; set; }

    public int? Stock { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
}
