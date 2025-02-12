using ECommerce.Context;
using ECommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            if (users == null || users.Count == 0)
            {
                return NotFound(new { Message = "Aucun utilisateur trouvé." });
            }
            return Ok(new { Message = $"{users.Count} utilisateur(s) trouvé(s).", Data = users });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = $"Utilisateur avec l'ID {id} non trouvé." });
            }
            return Ok(new { Message = "Utilisateur trouvé avec succès.", Data = user });
        }

        [HttpPost("create")]
        public async Task<ActionResult<User>> CreateUser([FromBody] CreateAndUpdateUser userDto)
        {
            if (userDto == null)
            {
                return BadRequest(new { Message = "Les données utilisateur sont manquantes." });
            }

            if (string.IsNullOrWhiteSpace(userDto.Email) || !IsValidEmail(userDto.Email))
            {
                return BadRequest(new { Message = "L'email est invalide." });
            }

            if (string.IsNullOrWhiteSpace(userDto.Password))
            {
                return BadRequest(new { Message = "Le mot de passe est requis." });
            }

            if (string.IsNullOrWhiteSpace(userDto.Role))
            {
                return BadRequest(new { Message = "Le rôle de l'utilisateur est requis." });
            }

            var newUser = new User
            {
                Email = userDto.Email,
                Password = HashPassword(userDto.Password),
                Role = userDto.Role
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, new { Message = "Utilisateur créé avec succès.", Data = newUser });
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Administrateur,user")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] CreateAndUpdateUser userDto)
        {
            if (id <= 0 || userDto == null)
            {
                return BadRequest(new { Message = "Les données utilisateur sont manquantes." });
            }

            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound(new { Message = $"Utilisateur avec l'ID {id} non trouvé." });
            }

            if (!string.IsNullOrEmpty(userDto.Email))
            {
                if (!IsValidEmail(userDto.Email))
                {
                    return BadRequest(new { Message = "L'email est invalide." });
                }
                existingUser.Email = userDto.Email;
            }

            existingUser.Role = userDto.Role;

            if (!string.IsNullOrEmpty(userDto.Password))
            {
                existingUser.Password = HashPassword(userDto.Password);
            }

            _context.Entry(existingUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new { Message = $"Utilisateur avec l'ID {id} non trouvé." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = $"Utilisateur avec l'ID {id} mis à jour avec succès.", Data = existingUser });
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrateur,user")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = $"Utilisateur avec l'ID {id} non trouvé." });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Utilisateur avec l'ID {id} supprimé avec succès." });
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var builder = new StringBuilder();
            foreach (var b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }

        private static bool IsValidEmail(string email)
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return emailRegex.IsMatch(email);
        }
    }
}

public class CreateAndUpdateUser
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Role { get; set; }
}
