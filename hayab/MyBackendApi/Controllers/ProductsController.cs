using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackendApi.Models;

namespace MyBackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly Supabase.Client _supabaseClient;

    public ProductsController(AppDbContext context, Supabase.Client supabaseClient)
    {
        _context = context;
        _supabaseClient = supabaseClient;
    }

    // GET: api/Products (Reads from DB and includes image URLs)
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _context.Products.Include(p => p.Images).ToListAsync();
        return Ok(products);
    }
// PUT: api/Products/5 (Updates product data and uploads new optional images)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(
        int id,
        [FromForm] string name,
        [FromForm] string arabicName,
        [FromForm] string category,
        [FromForm] decimal price,
        [FromForm] string colorName,
        [FromForm] string colorHex,
        [FromForm] string fabric,
        [FromForm] string description,
        [FromForm] string heritageStory,
        [FromForm] string sizes,
        List<IFormFile> photos)
    {
        var product = await _context.Products.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        product.Name = name;
        product.ArabicName = arabicName;
        product.Category = category;
        product.Price = price;
        product.ColorName = colorName;
        product.ColorHex = colorHex;
        product.Fabric = fabric;
        product.Description = description;
        product.HeritageStory = heritageStory;
        product.Sizes = sizes;

        // If new photos are uploaded, process them
        if (photos != null && photos.Count > 0)
        {
            await _supabaseClient.InitializeAsync();

            // Clear old database records for images of this product
            _context.ProductImages.RemoveRange(product.Images);
            product.Images.Clear();

            foreach (var photo in photos)
            {
                if (photo.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    await photo.CopyToAsync(memoryStream);
                    var fileBytes = memoryStream.ToArray();

                    var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(photo.FileName)}";
                    
                    await _supabaseClient.Storage
                        .From("product-images")
                        .Upload(fileBytes, uniqueFileName);

                    var publicUrl = _supabaseClient.Storage
                        .From("product-images")
                        .GetPublicUrl(uniqueFileName);

                    product.Images.Add(new ProductImage { ImageUrl = publicUrl });
                }
            }
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/Products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
    // POST: api/Products (Creates product and uploads images)
    [HttpPost]
    public async Task<IActionResult> CreateProduct(
        [FromForm] string name,
        [FromForm] string arabicName,
        [FromForm] string category,
        [FromForm] decimal price,
        [FromForm] string colorName,
        [FromForm] string colorHex,
        [FromForm] string fabric,
        [FromForm] string description,
        [FromForm] string heritageStory,
        [FromForm] string sizes, // Expected format: "S,M,L"
        List<IFormFile> photos)
    {
        var product = new Product
        {
            Name = name,
            ArabicName = arabicName,
            Category = category,
            Price = price,
            ColorName = colorName,
            ColorHex = colorHex,
            Fabric = fabric,
            Description = description,
            HeritageStory = heritageStory,
            Sizes = sizes
        };

        await _supabaseClient.InitializeAsync();

        foreach (var photo in photos)
        {
            if (photo.Length > 0)
            {
                using var memoryStream = new MemoryStream();
                await photo.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();

                var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(photo.FileName)}";
                
                await _supabaseClient.Storage
                    .From("product-images")
                    .Upload(fileBytes, uniqueFileName);

                var publicUrl = _supabaseClient.Storage
                    .From("product-images")
                    .GetPublicUrl(uniqueFileName);

                product.Images.Add(new ProductImage { ImageUrl = publicUrl });
            }
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return Ok(product);
    }
}