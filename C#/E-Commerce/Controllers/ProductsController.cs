using ECommerce.Context;
using ECommerce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            if (products == null || !products.Any())
            {
                return NotFound(new { Message = "Aucun produit trouvé." });
            }
            return Ok(new { Message = $"{products.Count} produit(s) trouvé(s).", Data = products });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound(new { Message = $"Produit avec l'ID {id} non trouvé." });
            }
            return Ok(new { Message = "Produit trouvé avec succès.", Data = product });
        }

        [HttpPost("create")]
        [Authorize(Roles = "Administrateur")]
        public async Task<ActionResult<Product>> CreateProduct([FromBody] CreateAndUpdateProduct productDto)
        {
            if (productDto == null)
            {
                return BadRequest(new { Message = "Les données du produit sont manquantes." });
            }

            if (string.IsNullOrWhiteSpace(productDto.Name))
            {
                return BadRequest(new { Message = "Le nom du produit est requis." });
            }

            if (productDto.Price <= 0)
            {
                return BadRequest(new { Message = "Le prix du produit doit être supérieur à zéro." });
            }

            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Description = productDto.Description
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, new { Message = "Produit créé avec succès.", Data = product });
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Administrateur")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] CreateAndUpdateProduct productDto)
        {
            if (id <= 0 || productDto == null)
            {
                return BadRequest(new { Message = "Les données du produit sont manquantes." });
            }

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return NotFound(new { Message = $"Produit avec l'ID {id} non trouvé." });
            }

            existingProduct.Name = productDto.Name;
            existingProduct.Price = productDto.Price;
            existingProduct.Description = productDto.Description;

            _context.Entry(existingProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound(new { Message = $"Produit avec l'ID {id} non trouvé." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = $"Produit avec l'ID {id} mis à jour avec succès.", Data = existingProduct });
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrateur")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound(new { Message = $"Produit avec l'ID {id} non trouvé." });
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(new { Message = $"Produit avec l'ID {id} supprimé avec succès." });
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}

public class CreateAndUpdateProduct
{
    public required string Name { get; set; }
    public required decimal Price { get; set; }
    public string? Description { get; set; }
}
