using C.Models;
using C.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace C.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users.ToList();
            if (users == null || users.Count == 0)
            {
                return NotFound("Aucun utilisateur trouvé.");
            }
            return Ok(new { Message = $"{users.Count} utilisateur(s) trouvé(s).", Data = users });
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound($"Utilisateur avec l'ID {id} non trouvé.");
            }
            return Ok(new { Message = "Utilisateur trouvé avec succès.", Data = user });
        }

        [HttpPost("create")]
        public IActionResult CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("Les données utilisateur sont manquantes.");
            }

            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Format d'email invalide. L'email doit être sous la forme ***@***.com.");
            }

            if (string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Le mot de passe est requis.");
            }

            if (string.IsNullOrWhiteSpace(user.Role))
            {
                return BadRequest("Le rôle de l'utilisateur est requis.");
            }

            user.Password = HashPassword(user.Password);

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(new { Message = "Utilisateur créé avec succès.", Data = user });
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            var existingUser = _context.Users.Find(id);
            if (existingUser == null)
            {
                return NotFound($"Utilisateur avec l'ID {id} non trouvé.");
            }

            if (!IsValidEmail(user.Email))
            {
                return BadRequest("Format d'email invalide. L'email doit être sous la forme ***@***.com.");
            }

            existingUser.Email = user.Email;
            existingUser.Role = user.Role;

            if (!string.IsNullOrEmpty(user.Password))
            {
                existingUser.Password = HashPassword(user.Password);
            }

            _context.Users.Update(existingUser);
            _context.SaveChanges();
            return Ok(new { Message = $"Utilisateur avec l'ID {id} mis à jour avec succès.", Data = existingUser });
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "admin,user")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound($"Utilisateur avec l'ID {id} non trouvé.");
            }

            var currentUserEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            var currentUserRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (user.Email != currentUserEmail && currentUserRole != "admin")
            {
                return Forbid("Vous n'êtes pas autorisé à supprimer cet utilisateur.");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok($"Utilisateur avec l'ID {id} supprimé avec succès.");
        }


        private static bool IsValidEmail(string email)
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return emailRegex.IsMatch(email);
        }

        private static string HashPassword(string password)
        {
            byte[] bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserCredentials credentials)
        {
            var existingUser = _context.Users
                .SingleOrDefault(u => u.Email == credentials.Email && u.Password == HashPassword(credentials.Password));

            if (existingUser == null)
            {
                return Unauthorized("Email ou mot de passe invalide.");
            }

            var keyString = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(keyString) || keyString.Length < 32)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "La clé JWT n'est pas configurée correctement.");
            }

            var key = Encoding.ASCII.GetBytes(keyString);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, existingUser.Email),
                    new Claim(ClaimTypes.Role, existingUser.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }

        public class UserCredentials
        {
            public required string Email { get; set; }
            public required string Password { get; set; }
        }
    }
}

