namespace EcomDash.Models;

public partial class Employee
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string Email { get; set; }

    public string Password { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string? Job { get; set; }

    public string? Role { get; set; }

    public decimal? Salary { get; set; }
}
