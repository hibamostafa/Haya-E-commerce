namespace MyBackendApi.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ArabicName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ColorName { get; set; } = string.Empty;
    public string ColorHex { get; set; } = string.Empty;
    public string Fabric { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string HeritageStory { get; set; } = string.Empty;
    
    // We will store sizes as a simple comma-separated string (e.g., "S,M,L")
    public string Sizes { get; set; } = string.Empty; 

    public List<ProductImage> Images { get; set; } = new();
}