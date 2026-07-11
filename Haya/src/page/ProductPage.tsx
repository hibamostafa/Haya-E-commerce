import React, { useState, useEffect, useMemo } from 'react';

// --- Type Definitions ---
export interface Product {
  id: number;
  name: string;
  arabicName: string;
  category: string;
  price: number;
  colorName: string;
  colorHex: string;
  fabric: 'Linen' | 'Japanese Satin' | 'Silk Crepe' | 'Georgette' | 'Velvet';
  imageUrl: string;
  hoverImageUrl: string;
  description: string;
  heritageStory: string;
  sizes: string[];
}
interface ProductPageProps {
  onAddToCart?: () => void;
  onExamineProduct?: (product: Product) => void; // Add this line
  initialCategory?: string;
}
// --- High-End Product Catalog Data (Fallback Mock Data) ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Mint Arabesque Abaya",
    arabicName: "عباية الأرابيسك الأخاذة",
    category: "Abayas",
    price: 145.00,
    colorName: "Mint Sage",
    colorHex: "#A3B899",
    fabric: "Silk Crepe",
    imageUrl: "https://i.pinimg.com/736x/86/b1/3e/86b13e9da1024de55a797501f9b0f66f.jpg",
    hoverImageUrl: "https://i.pinimg.com/736x/ea/3a/c6/ea3ac6e5adfc7380de194c9ed2cb45f0.jpg",
    description: "Premium crinkle crepe with minimalist, tone-on-tone geometric embroidery along the inner lapel and cuffs.",
    heritageStory: "Hand-finished in a family-run atelier in Damascus, utilizing geometric cross-stitch techniques passed down through three generations.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "The Desert Dunes Bisht",
    arabicName: "بشت كثبان الصحراء",
    category: "Bishts",
    price: 135.00,
    colorName: "Sand Beige",
    colorHex: "#D7CDBB",
    fabric: "Linen",
    imageUrl: "https://i.pinimg.com/736x/81/15/fc/8115fc8a86340c97ccbb6574cc183501.jpg",
    hoverImageUrl: "https://i.pinimg.com/736x/86/b1/3e/86b13e9da1024de55a797501f9b0f66f.jpg",
    description: "Breathable linen-viscose blend featuring deep earthy brown contrast piping and a relaxed, graceful drape.",
    heritageStory: "Woven in the historic textile quarters of Isfahan, Persia, mimicking the ripples formed by the desert winds across sand dunes.",
    sizes: ["M", "L", "XL"]
  },
  {
    id: 3,
    name: "The Earth & Sage Layered Set",
    arabicName: "طقم الأرض والمرمر",
    category: "Modest Sets",
    price: 165.00,
    colorName: "Earthy Umber",
    colorHex: "#4A3B32",
    fabric: "Japanese Satin",
    imageUrl: "https://i.pinimg.com/736x/ea/3a/c6/ea3ac6e5adfc7380de194c9ed2cb45f0.jpg",
    hoverImageUrl: "https://i.pinimg.com/736x/81/15/fc/8115fc8a86340c97ccbb6574cc183501.jpg",
    description: "Two-piece premium Japanese satin set offering a structured dark brown abaya with a modern mint inner slip.",
    heritageStory: "Combines modern modular tailoring with classic modest drapes, inspired by symmetrical courtyards of Andalusian riads.",
    sizes: ["S", "M", "L"]
  },
  {
    id: 4,
    name: "Pomegranate Brocade Kaftan",
    arabicName: "قفطان الرمان الدمشقي",
    category: "Abayas",
    price: 195.00,
    colorName: "Saffron Red",
    colorHex: "#8C3F3F",
    fabric: "Silk Crepe",
    imageUrl: "https://i.pinimg.com/736x/ea/3a/c6/ea3ac6e5adfc7380de194c9ed2cb45f0.jpg",
    hoverImageUrl: "https://i.pinimg.com/736x/86/b1/3e/86b13e9da1024de55a797501f9b0f66f.jpg",
    description: "Rich pomegranate hue silk crepe offset by fine gold threads, echoing historical royal Persian robes.",
    heritageStory: "Adorned with gold thread hand-embroidery along the collar, inspired by tile motifs found inside the Shah Mosque.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Clay Rose Georgette Hijab",
    arabicName: "طرحة جورجيت بلون الصلصال",
    category: "Hijabs",
    price: 45.00,
    colorName: "Clay Rose",
    colorHex: "#C5A894",
    fabric: "Georgette",
    imageUrl: "https://i.pinimg.com/736x/81/15/fc/8115fc8a86340c97ccbb6574cc183501.jpg",
    hoverImageUrl: "https://i.pinimg.com/736x/ea/3a/c6/ea3ac6e5adfc7380de194c9ed2cb45f0.jpg",
    description: "Non-slip premium georgette, exceptionally breathable with hand-rolled hems and double-stitched details.",
    heritageStory: "Crafted specifically to withstand warm coastal climates, keeping a fluid drape while remaining structured throughout the day.",
    sizes: ["One Size"]
  },
  {
    id: 6,
    name: "Oasis Linen Trench Abaya",
    arabicName: "عباية الخندق الواحة اللينين",
    category: "Abayas",
    price: 155.00,
    colorName: "Mint Sage",
    colorHex: "#A3B899",
    fabric: "Linen",
    imageUrl: "https://i.pinimg.com/736x/86/b1/3e/86b13e9da1024de55a797501f9b0f66f.jpg",
    hoverImageUrl: "https://i.pinimg.com/736x/81/15/fc/8115fc8a86340c97ccbb6574cc183501.jpg",
    description: "Structured double-breasted linen trench abaya, incorporating natural tortoiseshell-pattern fasteners.",
    heritageStory: "An urban iteration of the classic abaya, merging Western utility trench elements with Middle-Eastern modesty guidelines.",
    sizes: ["S", "M", "L"]
  },
  {
    id: 7,
    name: "Shiraz Midnight Velvet Bisht",
    arabicName: "بشت شيراز المخملي الداكن",
    category: "Bishts",
    price: 210.00,
    colorName: "Earthy Umber",
    colorHex: "#2E2520",
    fabric: "Velvet",
    imageUrl: "https://i.pinimg.com/736x/ea/3a/c6/ea3ac6e5adfc7380de194c9ed2cb45f0.jpg",
    hoverImageUrl: "https://i.pinimg.com/736x/86/b1/3e/86b13e9da1024de55a797501f9b0f66f.jpg",
    description: "Ultra-luxurious heavy velvet bisht lined with premium Japanese silk, ideal for elegant evening wear.",
    heritageStory: "Lined with silk inspired by antique Persian carpets, featuring hidden pockets and a signature weighted drape.",
    sizes: ["M", "L"]
  }
];

interface ProductPageProps {
  onAddToCart?: () => void;
  onExamineProduct?: (product: Product) => void;
  initialCategory?: string;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onAddToCart, onExamineProduct, initialCategory = 'All' }) => {
  // --- Dynamic API state ---
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // --- State Controllers ---
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(250);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'editorial'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // --- Fetching from .NET API ---
  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const response = await fetch('https://localhost:7137/api/Products');
        if (response.ok) {
          const data = await response.json();
          
          // Map database structure to the React layout requirements
          const mappedProducts = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            arabicName: item.arabicName || "تصميم فريد", // Fallback for database schemas
            category: item.category || "Abayas",
            price: item.price,
            colorName: item.colorName || "Mint Sage",
            colorHex: item.colorHex || "#A3B899",
            fabric: item.fabric || "Silk Crepe",
            imageUrl: item.images && item.images.length > 0 
              ? item.images[0].imageUrl 
              : "https://via.placeholder.com/400x533?text=Haya+Abaya",
            hoverImageUrl: item.images && item.images.length > 1 
              ? item.images[1].imageUrl 
              : (item.images && item.images.length > 0 ? item.images[0].imageUrl : "https://via.placeholder.com/400x533?text=Haya+Abaya"),
            description: item.description,
            heritageStory: item.heritageStory || "Inspired by traditional Arabesque geometry.",
            sizes: item.sizes || ["S", "M", "L", "XL"]
          }));

          setProducts(mappedProducts.length > 0 ? mappedProducts : PRODUCTS);
        } else {
          setProducts(PRODUCTS);
        }
      } catch (error) {
        console.warn("Could not fetch database products. Falling back to default catalog.", error);
        setProducts(PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveProducts();
  }, []);

  // Synchronize category state when navigation choices change
  useEffect(() => {
    if (initialCategory) {
      if (initialCategory.includes('Abaya')) {
        setSelectedCategory('Abayas');
      } else if (initialCategory.includes('Bisht')) {
        setSelectedCategory('Bishts');
      } else if (initialCategory.includes('Dresses') || initialCategory.includes('Sets')) {
        setSelectedCategory('Modest Sets');
      } else if (initialCategory.includes('Hijab') || initialCategory.includes('Scarves')) {
        setSelectedCategory('Hijabs');
      } else {
        setSelectedCategory('All');
      }
    }
  }, [initialCategory]);

  // --- Filtering & Sorting Logic ---
  const filteredProducts = useMemo(() => {
    let result = [...products]; // FIXED: Now references stateful "products" instead of "PRODUCTS"

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Color
    if (selectedColors.length > 0) {
      result = result.filter(p => selectedColors.includes(p.colorName));
    }

    // Filter by Fabric Type
    if (selectedFabrics.length > 0) {
      result = result.filter(p => selectedFabrics.includes(p.fabric));
    }

    // Filter by Price
    result = result.filter(p => p.price <= priceRange);

    // Apply Sorting
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, selectedCategory, selectedColors, selectedFabrics, priceRange, sortBy]);

  // Handle Multi-Select Filters
  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleFabricToggle = (fabric: string) => {
    setSelectedFabrics(prev => 
      prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedColors([]);
    setSelectedFabrics([]);
    setPriceRange(250);
  };

  return (
    <div className="haya-catalog-page">
      <style>{`
        /* Color Palette & Layout Styles */
        :root {
          --color-beige: #F5F2EB;
          --color-white: #FCFBF9;
          --color-brown-dark: #4A3B32;
          --color-brown-light: #8C7A6B;
          --color-mint: #A3B899;
          --color-mint-light: #EBF0E9;
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'Montserrat', Helvetica, sans-serif;
          --transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          --pattern-persian-damask: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 C45,15 15,45 0,60 C15,75 45,105 60 120 C75,105 105,75 120 60 C105,45 75,15 60 0' stroke='%234A3B32' stroke-opacity='0.03' stroke-width='1' fill='none'/%3E%3Cpolygon points='60,50 70,60 60,70 50,60' stroke='%234A3B32' stroke-opacity='0.03' fill='none'/%3E%3C/svg%3E");
        }

        .haya-catalog-page {
          background-color: var(--color-white);
          background-image: var(--pattern-persian-damask);
          color: var(--color-brown-dark);
          font-family: var(--font-sans);
          padding-top: 100px;
          min-height: 100vh;
        }

        .haya-catalog-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 40px;
        }

        /* FIXED: Added styling rule for the primary ".haya-btn" */
        .haya-btn {
          background-color: var(--color-brown-dark);
          color: var(--color-white);
          border: 1px solid var(--color-brown-dark);
          font-family: var(--font-sans);
          padding: 14px 28px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition);
          display: inline-block;
          text-align: center;
        }

        .haya-btn:hover {
          background-color: var(--color-white);
          color: var(--color-brown-dark);
          border-color: var(--color-brown-dark);
        }

        /* --- Header Section --- */
        .haya-catalog-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .haya-catalog-header-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .haya-catalog-arabic-heading {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 1.8rem;
          color: var(--color-brown-light);
          line-height: 1.2;
          margin: 0;
        }

        .haya-logo-divider {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: var(--color-mint);
          clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
          flex-shrink: 0;
        }

        .haya-catalog-title {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0;
        }

        .haya-catalog-subtitle {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.1rem;
          color: var(--color-mint);
          margin-top: 10px;
          letter-spacing: 0.05em;
        }

        .haya-divider-motif {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 20px;
        }

        .haya-divider-line {
          height: 1px;
          width: 60px;
          background-color: rgba(74, 59, 50, 0.15);
        }

        .haya-divider-star {
          width: 12px;
          height: 12px;
          color: var(--color-mint);
        }

        /* --- Control Bar --- */
        .haya-controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(74, 59, 50, 0.08);
          padding-bottom: 20px;
          margin-bottom: 40px;
        }

        .haya-filter-toggle-btn {
          display: none;
          font-family: var(--font-sans);
          font-size: 12px;
          letter-spacing: 1px;
          background: none;
          border: 1px solid var(--color-brown-dark);
          color: var(--color-brown-dark);
          padding: 10px 20px;
          cursor: pointer;
          text-transform: uppercase;
          transition: var(--transition);
        }

        .haya-filter-toggle-btn:hover {
          background-color: var(--color-brown-dark);
          color: var(--color-white);
        }

        .haya-layout-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .haya-layout-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-brown-light);
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .haya-layout-btn.active {
          color: var(--color-brown-dark);
        }

        .haya-sort-dropdown {
          background: transparent;
          border: 1px solid rgba(74, 59, 50, 0.15);
          font-family: var(--font-sans);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 8px 16px;
          color: var(--color-brown-dark);
          outline: none;
          cursor: pointer;
          transition: var(--transition);
        }

        .haya-sort-dropdown:hover {
          border-color: var(--color-brown-dark);
        }

        /* --- Main Layout Grid --- */
        .haya-catalog-grid-wrapper {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* --- Sidebar Filters --- */
        .haya-sidebar-filters {
          display: flex;
          flex-direction: column;
          gap: 36px;
          background-color: rgba(245, 242, 235, 0.4);
          padding: 30px 24px;
          border: 1px solid rgba(140, 122, 107, 0.12);
          border-radius: 12px;
        }

        .haya-filter-group-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 18px;
          color: var(--color-brown-dark);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .haya-filter-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .haya-category-filter-item {
          font-family: var(--font-sans);
          font-size: 13px;
          cursor: pointer;
          color: var(--color-brown-light);
          transition: var(--transition);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .haya-category-filter-item:hover, .haya-category-filter-item.active {
          color: var(--color-brown-dark);
          font-weight: 500;
          transform: translateX(4px);
        }

        .haya-swatch-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .haya-swatch-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.1);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .haya-swatch-btn:hover {
          transform: scale(1.1);
        }

        .haya-swatch-btn.active {
          box-shadow: 0 0 0 2px var(--color-white), 0 0 0 4px var(--color-mint);
        }

        .haya-checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--color-brown-light);
          cursor: pointer;
          user-select: none;
        }

        .haya-checkbox-input {
          accent-color: var(--color-mint);
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .haya-price-slider-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .haya-price-slider {
          width: 100%;
          accent-color: var(--color-mint);
          cursor: pointer;
        }

        .haya-price-range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 500;
          color: var(--color-brown-light);
        }

        .haya-clear-filters-btn {
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: none;
          border: 1px dashed var(--color-brown-light);
          color: var(--color-brown-light);
          padding: 12px;
          width: 100%;
          cursor: pointer;
          transition: var(--transition);
        }

        .haya-clear-filters-btn:hover {
          border-color: var(--color-brown-dark);
          color: var(--color-brown-dark);
          background-color: var(--color-beige);
        }

        /* --- Active Filter Tags --- */
        .haya-active-filters-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }

        .haya-filter-tag {
          background-color: var(--color-mint-light);
          color: var(--color-brown-dark);
          font-size: 11px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .haya-filter-tag-close {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-brown-light);
          font-weight: bold;
          display: flex;
          align-items: center;
        }

        /* --- Product Grid & Layout Mode Settings --- */
        .haya-product-list-container {
          display: flex;
          flex-direction: column;
        }

        .haya-main-catalog-grid {
          display: grid;
          gap: 30px;
          transition: var(--transition);
        }

        .haya-main-catalog-grid.layout-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .haya-main-catalog-grid.layout-editorial {
          grid-template-columns: repeat(2, 1fr);
        }

        /* --- High-end Arch Cards --- */
        .haya-catalog-product-card {
          background-color: #2E2520;
          padding: 16px;
          border-radius: 140px 140px 12px 12px;
          border: 1px solid rgba(140, 122, 107, 0.2);
          box-shadow: 0 10px 30px rgba(42, 34, 30, 0.08);
          position: relative;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }

        .haya-catalog-product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(42, 34, 30, 0.2);
          border-color: var(--color-mint);
        }

        .haya-card-image-container {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 124px 124px 0 0;
          background-color: var(--color-mint-light);
          margin-bottom: 20px;
        }

        .haya-card-mihrab-overlay {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 1px solid rgba(245, 242, 235, 0.15);
          border-radius: 114px 114px 0 0;
          pointer-events: none;
          z-index: 2;
          transition: var(--transition);
        }

        .haya-catalog-product-card:hover .haya-card-mihrab-overlay {
          border-color: var(--color-mint);
          transform: scale(0.98);
        }

        .haya-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .haya-card-image-secondary {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: var(--transition);
        }

        .haya-catalog-product-card:hover .haya-card-image-secondary {
          opacity: 1;
        }

        .haya-card-purchase-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(to top, rgba(46,37,32,0.95) 40%, transparent 100%);
          padding: 40px 20px 20px 20px;
          opacity: 0;
          transform: translateY(12px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 3;
          transition: var(--transition);
        }

        .haya-catalog-product-card:hover .haya-card-purchase-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .haya-card-action-btn {
          background-color: var(--color-white);
          color: var(--color-brown-dark);
          font-family: var(--font-sans);
          border: none;
          padding: 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition);
          width: 100%;
        }

        .haya-card-action-btn:hover {
          background-color: var(--color-brown-dark);
          color: var(--color-white);
          border: 1px solid var(--color-white);
        }

        .haya-card-metadata {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding: 0 4px;
        }

        .haya-card-category {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(245, 242, 235, 0.6);
          font-weight: 600;
        }

        .haya-card-arabic-name {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 1.2rem;
          color: var(--color-mint);
        }

        .haya-card-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--color-white);
          text-decoration: none;
          margin-bottom: 8px;
          display: block;
        }

        .haya-card-description {
          font-size: 12px;
          color: rgba(245, 242, 235, 0.7);
          line-height: 1.6;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .haya-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px dashed rgba(245, 242, 235, 0.15);
          margin-top: auto;
        }

        .haya-card-fabric-tag {
          font-size: 11px;
          color: rgba(245, 242, 235, 0.5);
        }

        .haya-card-price {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--color-mint);
        }

        /* --- Empty State --- */
        .haya-empty-state {
          text-align: center;
          padding: 80px 40px;
          border: 1px dashed rgba(74,59,50,0.15);
          border-radius: 12px;
          background-color: rgba(245, 242, 235, 0.2);
        }

        .haya-empty-state-arabic {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 2rem;
          color: var(--color-brown-light);
          margin-bottom: 12px;
        }

        .haya-empty-state-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        /* --- Luxurious Modal Drawer --- */
        .haya-modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(35, 34, 32, 0.6);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          opacity: 0;
          pointer-events: none;
          transition: var(--transition);
        }

        .haya-modal-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .haya-quickview-panel {
          background-color: var(--color-white);
          border: 1px solid var(--color-brown-dark);
          border-radius: 16px;
          max-width: 1000px;
          width: 100%;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
          display: grid;
          grid-template-columns: 1.1fr 1.2fr;
          position: relative;
          transform: scale(0.95);
          transition: var(--transition);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15);
        }

        .haya-modal-overlay.open .haya-quickview-panel {
          transform: scale(1);
        }

        .haya-modal-close-btn {
          position: absolute;
          top: 20px; right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-brown-dark);
          z-index: 10;
        }

        .haya-qv-image-panel {
          position: relative;
          aspect-ratio: 3 / 4;
          background-color: var(--color-mint-light);
          overflow: hidden;
        }

        .haya-qv-mihrab-frame {
          position: absolute;
          top: 15px; left: 15px; right: 15px; bottom: 15px;
          border: 1px solid rgba(74, 59, 50, 0.15);
          border-radius: 160px 160px 0 0;
          pointer-events: none;
          z-index: 2;
        }

        .haya-qv-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 175px 175px 0 0;
          padding: 10px 10px 0 10px;
        }

        .haya-qv-details-panel {
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .haya-qv-arabic {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 1.8rem;
          color: var(--color-mint);
          direction: rtl;
        }

        .haya-qv-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 300;
          text-transform: uppercase;
        }

        .haya-qv-fabric-badge {
          display: inline-block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: 1px solid var(--color-brown-light);
          color: var(--color-brown-light);
          padding: 4px 10px;
          align-self: flex-start;
        }

        .haya-qv-story-card {
          background-color: var(--color-beige);
          border-left: 2px solid var(--color-mint);
          padding: 16px;
          font-size: 13px;
          font-style: italic;
          color: var(--color-brown-light);
          line-height: 1.6;
        }

        .haya-size-selector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .haya-size-grid {
          display: flex;
          gap: 12px;
        }

        .haya-size-btn {
          background: none;
          border: 1px solid rgba(74, 59, 50, 0.15);
          color: var(--color-brown-dark);
          padding: 10px 20px;
          font-size: 12px;
          cursor: pointer;
          transition: var(--transition);
        }

        .haya-size-btn.active {
          background-color: var(--color-brown-dark);
          color: var(--color-white);
          border-color: var(--color-brown-dark);
        }

        /* --- Loading Spinner --- */
        .haya-loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 0;
          gap: 16px;
        }

        .haya-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid var(--color-beige);
          border-top: 3px solid var(--color-mint);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* --- Responsive Queries --- */
        @media (max-width: 1024px) {
          .haya-catalog-grid-wrapper {
            grid-template-columns: 1fr;
          }

          .haya-filter-toggle-btn {
            display: block;
          }

          .haya-sidebar-filters {
            position: fixed;
            top: 0; left: 0; width: 300px; height: 100vh;
            background-color: var(--color-white);
            z-index: 3000;
            overflow-y: auto;
            transform: translateX(-100%);
            box-shadow: 10px 0 30px rgba(0,0,0,0.1);
            border-radius: 0;
            transition: var(--transition);
          }

          .haya-sidebar-filters.open {
            transform: translateX(0);
          }

          .haya-main-catalog-grid.layout-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .haya-quickview-panel {
            grid-template-columns: 1fr;
          }
          .haya-qv-image-panel {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .haya-main-catalog-grid.layout-grid, 
          .haya-main-catalog-grid.layout-editorial {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="haya-catalog-container">
        {/* Page Heading & Persian Star Motif */}
        <div className="haya-catalog-header">
          <div className="haya-catalog-header-group">
            <h1 className="haya-catalog-title">The Complete Catalog</h1>
            <span className="haya-logo-divider" aria-hidden="true"></span>
            <h2 className="haya-catalog-arabic-heading">المجموعة الكاملة</h2>
          </div>
          
          <p className="haya-catalog-subtitle">Timeless drapes and silhouettes woven for the modern wardrobe</p>
          
          <div className="haya-divider-motif">
            <span className="haya-divider-line"></span>
            <svg className="haya-divider-star" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
            </svg>
            <span className="haya-divider-line"></span>
          </div>
        </div>

        {/* Filters and Controls Toolbar */}
        <div className="haya-controls-bar">
          <button className="haya-filter-toggle-btn" onClick={() => setIsFilterDrawerOpen(true)}>
            Filters & Refinements
          </button>

          {/* Grid/Editorial Layout Toggles */}
          <div className="haya-layout-controls">
            <button 
              className={`haya-layout-btn ${layoutMode === 'grid' ? 'active' : ''}`}
              onClick={() => setLayoutMode('grid')}
              aria-label="Standard Grid View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button 
              className={`haya-layout-btn ${layoutMode === 'editorial' ? 'active' : ''}`}
              onClick={() => setLayoutMode('editorial')}
              aria-label="Editorial View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="7" />
                <rect x="3" y="14" width="18" height="7" />
              </svg>
            </button>
          </div>

          {/* Sort Selection Dropdown */}
          <select 
            className="haya-sort-dropdown" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured Artisanal</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Latest Release</option>
          </select>
        </div>

        {/* Multi-Column Main Layout Grid */}
        <div className="haya-catalog-grid-wrapper">
          
          {/* Sidebar Filter System */}
          <aside className={`haya-sidebar-filters ${isFilterDrawerOpen ? 'open' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="haya-filter-toggle-btn" 
                style={{ display: 'none' }}
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                Apply Filters
              </button>
            </div>

            {/* Category selection */}
            <div>
              <h3 className="haya-filter-group-title">Silhouette</h3>
              <ul className="haya-filter-list">
                {['All', 'Abayas', 'Bishts', 'Modest Sets', 'Hijabs'].map(cat => (
                  <li 
                    key={cat} 
                    className={`haya-category-filter-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium color swatches */}
            <div>
              <h3 className="haya-filter-group-title">Color Palette</h3>
              <div className="haya-swatch-list">
                {[
                  { name: 'Mint Sage', hex: '#A3B899' },
                  { name: 'Sand Beige', hex: '#D7CDBB' },
                  { name: 'Earthy Umber', hex: '#4A3B32' },
                  { name: 'Saffron Red', hex: '#8C3F3F' },
                  { name: 'Clay Rose', hex: '#C5A894' }
                ].map(color => (
                  <button 
                    key={color.name}
                    className={`haya-swatch-btn ${selectedColors.includes(color.name) ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorToggle(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Fabric filters */}
            <div>
              <h3 className="haya-filter-group-title">Artisanal Fabric</h3>
              <ul className="haya-filter-list">
                {['Linen', 'Japanese Satin', 'Silk Crepe', 'Georgette', 'Velvet'].map(fab => (
                  <li key={fab}>
                    <label className="haya-checkbox-label">
                      <input 
                        type="checkbox" 
                        className="haya-checkbox-input"
                        checked={selectedFabrics.includes(fab)}
                        onChange={() => handleFabricToggle(fab)}
                      />
                      {fab}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price slider */}
            <div className="haya-price-slider-container">
              <h3 className="haya-filter-group-title">Investment Range</h3>
              <input 
                type="range" 
                min="40" 
                max="250" 
                className="haya-price-slider"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="haya-price-range-labels">
                <span>Min: $40</span>
                <span>Max: ${priceRange}</span>
              </div>
            </div>

            <button className="haya-clear-filters-btn" onClick={handleClearFilters}>
              Reset Refinements
            </button>
          </aside>

          {/* Product Cards Container */}
          <div className="haya-product-list-container">
            {/* Active Filter Badges */}
            {(selectedCategory !== 'All' || selectedColors.length > 0 || selectedFabrics.length > 0 || priceRange < 250) && (
              <div className="haya-active-filters-row">
                {selectedCategory !== 'All' && (
                  <span className="haya-filter-tag">
                    {selectedCategory}
                    <button className="haya-filter-tag-close" onClick={() => setSelectedCategory('All')}>×</button>
                  </span>
                )}
                {selectedColors.map(color => (
                  <span className="haya-filter-tag" key={color}>
                    {color}
                    <button className="haya-filter-tag-close" onClick={() => handleColorToggle(color)}>×</button>
                  </span>
                ))}
                {selectedFabrics.map(fab => (
                  <span className="haya-filter-tag" key={fab}>
                    {fab}
                    <button className="haya-filter-tag-close" onClick={() => handleFabricToggle(fab)}>×</button>
                  </span>
                ))}
                {priceRange < 250 && (
                  <span className="haya-filter-tag">
                    Under ${priceRange}
                    <button className="haya-filter-tag-close" onClick={() => setPriceRange(250)}>×</button>
                  </span>
                )}
              </div>
            )}

            {/* UX Loading State */}
            {isLoading ? (
              <div className="haya-loading-container">
                <div className="haya-spinner"></div>
                <p style={{ fontStyle: 'italic', color: 'var(--color-brown-light)' }}>
                  Loading collections...
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`haya-main-catalog-grid layout-${layoutMode}`}>
                {filteredProducts.map(product => (
                  <article key={product.id} className="haya-catalog-product-card">
                    <div className="haya-card-image-container">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="haya-card-image"
                      />
                      <img 
                        src={product.hoverImageUrl} 
                        alt={`${product.name} alternate view`} 
                        className="haya-card-image-secondary"
                      />
                      <div className="haya-card-mihrab-overlay"></div>
                      
                      <div className="haya-card-purchase-overlay">
                        <button className="haya-card-action-btn" onClick={() => onExamineProduct ? onExamineProduct(product) : setQuickViewProduct(product)}>
                          Examine Design
                        </button>
                        <button className="haya-card-action-btn" onClick={onAddToCart}>
                          Secure Purchase
                        </button>
                      </div>
                    </div>

                    <div className="haya-card-metadata">
                      <span className="haya-card-category">{product.category}</span>
                      <span className="haya-card-arabic-name">{product.arabicName}</span>
                    </div>

                    <a href="#examine" className="haya-card-title" onClick={() => setQuickViewProduct(product)}>
                      {product.name}
                    </a>
                    <p className="haya-card-description">{product.description}</p>

                    <div className="haya-card-footer">
                      <span className="haya-card-fabric-tag">{product.fabric}</span>
                      <span className="haya-card-price">${product.price.toFixed(2)}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="haya-empty-state">
                <div className="haya-empty-state-arabic">لم نعثر على أي نتائج</div>
                <h2 className="haya-empty-state-title">No matching designs found</h2>
                <p style={{ color: 'var(--color-brown-light)', maxWidth: '400px', margin: '0 auto 24px' }}>
                  Adjust your color palette or category selections to explore our collections.
                </p>
                <button className="haya-btn" onClick={handleClearFilters}>Clear Refinements</button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- Detailed Artisanal Heritage Drawer / Modal --- */}
      <div className={`haya-modal-overlay ${quickViewProduct ? 'open' : ''}`}>
        {quickViewProduct && (
          <div className="haya-quickview-panel">
            <button className="haya-modal-close-btn" onClick={() => setQuickViewProduct(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="haya-qv-image-panel">
              <div className="haya-qv-mihrab-frame"></div>
              <img src={quickViewProduct.imageUrl} alt={quickViewProduct.name} className="haya-qv-image" />
            </div>

            <div className="haya-qv-details-panel">
              <div className="haya-qv-arabic">{quickViewProduct.arabicName}</div>
              <h2 className="haya-qv-title">{quickViewProduct.name}</h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span className="haya-qv-fabric-badge">{quickViewProduct.fabric}</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-mint)' }}>
                  ${quickViewProduct.price.toFixed(2)}
                </span>
              </div>

              <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-brown-dark)' }}>
                {quickViewProduct.description}
              </p>

              <div className="haya-qv-story-card">
                <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--color-brown-dark)' }}>Heritage Note:</strong>
                {quickViewProduct.heritageStory}
              </div>

              {/* Sizing Section */}
              <div>
                <div className="haya-size-selector-header">
                  <span>Select Size</span>
                  <a href="#guide" style={{ color: 'var(--color-mint)', textDecoration: 'none' }}>Dimension Chart</a>
                </div>
                <div className="haya-size-grid" style={{ marginTop: '12px' }}>
                  {quickViewProduct.sizes.map(size => (
                    <button 
                      key={size}
                      className={`haya-size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="haya-btn" 
                style={{ width: '100%', marginTop: '12px', padding: '18px 0' }}
                onClick={() => {
                  if (onAddToCart) onAddToCart();
                  setQuickViewProduct(null);
                }}
              >
                Secure Purchase
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;