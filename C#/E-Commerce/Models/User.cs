namespace ECommerce.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
        public List<int> Panier { get; set; } = new List<int>();

    }
}
