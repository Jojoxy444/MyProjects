namespace C.Models
{
    public class User
    {
        public int ID { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}
