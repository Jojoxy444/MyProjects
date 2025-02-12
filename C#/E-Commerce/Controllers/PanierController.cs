using ECommerce.Context;
using ECommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/paniers")]
    [Authorize]
    public class PaniersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaniersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("add/{productId}")]
        public async Task<IActionResult> AddProductToPanier(int productId)
        {
            var userId = GetUserIdFromClaims();
            var user = await _context.Users.FindAsync(userId);
            var product = await _context.Products.FindAsync(productId);

            if (user == null)
            {
                return NotFound(new { Message = "Utilisateur non trouvé." });
            }

            if (product == null)
            {
                return NotFound(new { Message = "Aucun produit ne correspond à cet ID." });
            }

            if (!user.Panier.Contains(productId))
            {
                user.Panier.Add(productId);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return Ok(new { Message = $"Produit avec l'ID {productId} ajouté au panier avec succès." });
            }

            return BadRequest(new { Message = "Le produit est déjà dans le panier." });
        }

        [HttpPost("remove/{productId}")]
        public async Task<IActionResult> RemoveProductFromPanier(int productId)
        {
            var userId = GetUserIdFromClaims();
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound(new { Message = "Utilisateur non trouvé." });
            }

            if (!user.Panier.Contains(productId))
            {
                return NotFound(new { Message = "Produit non trouvé dans le panier." });
            }

            user.Panier.Remove(productId);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Produit avec l'ID {productId} supprimé du panier avec succès." });
        }

        private int GetUserIdFromClaims()
        {
            var userIdClaim = (User.FindFirst(ClaimTypes.NameIdentifier)?.Value) ?? throw new UnauthorizedAccessException("Le token JWT ne contient pas de revendication pour l'ID de l'utilisateur.");
            if (int.TryParse(userIdClaim, out var userId))
            {
                return userId;
            }

            throw new UnauthorizedAccessException("L'ID de l'utilisateur dans le token JWT est invalide.");
        }
    }
}
