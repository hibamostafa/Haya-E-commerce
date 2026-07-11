using Microsoft.EntityFrameworkCore;
using MyBackendApi.Models;

namespace MyBackendApi.Models // adjust namespace to match your project structure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<ProductImage> ProductImages { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Set up cascade delete: deleting a product removes its associated images
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Images)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}