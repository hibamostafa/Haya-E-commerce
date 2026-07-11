import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Heart, ChevronDown, ChevronUp, Ruler, Info } from 'lucide-react';
import type { Product } from './ProductPage';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ 
  product, 
  onBack, 
  onAddToCart 
}) => {
  // Gallery & Purchase States
  const [activeImage, setActiveImage] = useState<string>(product.imageUrl);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState<boolean>(false);
  
  // Accordion Section States
  const [openSection, setOpenSection] = useState<'story' | 'care' | 'shipping' | null>('story');

  const toggleSection = (section: 'story' | 'care' | 'shipping') => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    setQuantity(prev => {
      if (type === 'dec') return prev > 1 ? prev - 1 : 1;
      return prev + 1;
    });
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      alert('Please select a dimension (size) before adding to cart.');
      return;
    }
    if (onAddToCart) {
      onAddToCart(product, selectedSize, quantity);
    }
    alert(`Added ${quantity}x ${product.name} (Size: ${selectedSize}) securely to your cart.`);
  };

  // Thumbnail List
  const imagesList = [product.imageUrl, product.hoverImageUrl].filter(Boolean);

  return (
    <div className="haya-details-page">
      <style>{`
        .haya-details-page {
          background-color: var(--color-white);
          background-image: var(--pattern-persian-damask);
          color: var(--color-brown-dark);
          font-family: var(--font-sans);
          padding: 120px 20px 80px;
          min-height: 100vh;
        }

        .haya-details-container {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .haya-details-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* --- Back Button --- */
        .haya-back-button {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-brown-light);
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
          margin-bottom: 30px;
          transition: var(--transition);
          align-self: flex-start;
        }

        .haya-back-button:hover {
          color: var(--color-brown-dark);
          transform: translateX(-4px);
        }

        /* --- Gallery System --- */
        .haya-gallery-layout {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 20px;
        }

        @media (max-width: 600px) {
          .haya-gallery-layout {
            grid-template-columns: 1fr;
            display: flex;
            flex-direction: column-reverse;
          }
        }

        .haya-thumbnails-sidebar {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (max-width: 600px) {
          .haya-thumbnails-sidebar {
            flex-direction: row;
            justify-content: center;
          }
        }

        .haya-thumbnail-btn {
          border: 1px solid rgba(140, 122, 107, 0.15);
          background-color: var(--color-white);
          aspect-ratio: 3 / 4;
          width: 80px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          transition: var(--transition);
        }

        .haya-thumbnail-btn.active {
          border-color: var(--color-mint);
          box-shadow: 0 0 0 1px var(--color-mint);
        }

        .haya-thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .haya-main-viewport {
          position: relative;
          aspect-ratio: 3 / 4;
          background-color: var(--color-mint-light);
          border-radius: 200px 200px 12px 12px;
          border: 1px solid rgba(140, 122, 107, 0.2);
          overflow: hidden;
          padding: 16px 16px 0 16px;
        }

        .haya-details-mihrab-frame {
          position: absolute;
          top: 15px; left: 15px; right: 15px; bottom: 0;
          border: 1px solid rgba(74, 59, 50, 0.15);
          border-radius: 185px 185px 0 0;
          pointer-events: none;
          z-index: 2;
        }

        .haya-main-viewport-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 185px 185px 0 0;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* --- Details Panel --- */
        .haya-details-panel {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .haya-details-arabic-title {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 2.2rem;
          color: var(--color-mint);
          line-height: 1.2;
          margin: 0;
        }

        .haya-details-english-title {
          font-family: var(--font-serif);
          font-size: 2.4rem;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        .haya-details-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(74, 59, 50, 0.08);
          padding-bottom: 16px;
        }

        .haya-details-price {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--color-brown-dark);
        }

        .haya-details-fabric-badge {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border: 1px solid var(--color-brown-light);
          color: var(--color-brown-light);
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 600;
        }

        /* --- Sizing Section --- */
        .haya-details-section-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
          color: var(--color-brown-light);
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .haya-size-options-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .haya-details-size-btn {
          background: none;
          border: 1px solid rgba(74, 59, 50, 0.15);
          color: var(--color-brown-dark);
          padding: 12px 24px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
          border-radius: 4px;
        }

        .haya-details-size-btn:hover {
          border-color: var(--color-brown-dark);
        }

        .haya-details-size-btn.active {
          background-color: var(--color-brown-dark);
          color: var(--color-white);
          border-color: var(--color-brown-dark);
        }

        /* --- Quantity & Purchase Actions --- */
        .haya-purchase-controls {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 10px;
        }

        .haya-quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid rgba(74, 59, 50, 0.15);
          border-radius: 4px;
          background-color: var(--color-beige);
          height: 48px;
        }

        .haya-qty-btn {
          background: none;
          border: none;
          width: 40px;
          height: 100%;
          cursor: pointer;
          color: var(--color-brown-dark);
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .haya-qty-value {
          width: 30px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }

        .haya-details-favorite-btn {
          border: 1px solid rgba(74, 59, 50, 0.15);
          background: none;
          border-radius: 4px;
          height: 48px;
          width: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-brown-light);
          transition: var(--transition);
        }

        .haya-details-favorite-btn.active {
          background-color: #FDF2F2;
          color: #EF4444;
          border-color: #F8B4B4;
        }

        /* --- Accordion Panel --- */
        .haya-accordion-group {
          border-top: 1px solid rgba(74, 59, 50, 0.08);
          margin-top: 20px;
        }

        .haya-accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          cursor: pointer;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
          color: var(--color-brown-dark);
          border-bottom: 1px solid rgba(74, 59, 50, 0.08);
          transition: var(--transition);
        }

        .haya-accordion-header:hover {
          color: var(--color-mint);
        }

        .haya-accordion-body {
          font-size: 13.5px;
          line-height: 1.8;
          color: var(--color-brown-light);
          padding: 16px 4px;
          border-bottom: 1px solid rgba(74, 59, 50, 0.08);
          background-color: rgba(245, 242, 235, 0.15);
        }

        /* --- Size Chart Modal --- */
        .haya-size-modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(35, 34, 32, 0.5);
          backdrop-filter: blur(4px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .haya-size-modal {
          background-color: var(--color-white);
          border: 1px solid var(--color-brown-dark);
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          padding: 32px;
          position: relative;
        }

        .haya-size-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
          font-size: 12.5px;
        }

        .haya-size-table th, .haya-size-table td {
          border-bottom: 1px solid rgba(74, 59, 50, 0.08);
          padding: 10px;
          text-align: center;
        }
      `}</style>

      <div className="haya-details-container">
        
        {/* Left Side: Photo System */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button className="haya-back-button" onClick={onBack}>
            <ArrowLeft size={14} />
            Back to Collection
          </button>

          <div className="haya-gallery-layout">
            <div className="haya-thumbnails-sidebar">
              {imagesList.map((img, index) => (
                <button 
                  key={index} 
                  className={`haya-thumbnail-btn ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Alternative angle view ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="haya-main-viewport">
              <div className="haya-details-mihrab-frame"></div>
              <img src={activeImage} alt={product.name} className="haya-main-viewport-img" />
            </div>
          </div>
        </div>

        {/* Right Side: Information Panel */}
        <div className="haya-details-panel">
          <div>
            <h2 className="haya-details-arabic-title">{product.arabicName}</h2>
            <h1 className="haya-details-english-title" style={{ marginTop: '4px' }}>{product.name}</h1>
          </div>

          <div className="haya-details-meta-row">
            <span className="haya-details-price">${product.price.toFixed(2)}</span>
            <span className="haya-details-fabric-badge">{product.fabric}</span>
          </div>

          <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'var(--color-brown-dark)', margin: 0 }}>
            {product.description}
          </p>

          {/* Interactive Size Selector */}
          <div>
            <div className="haya-details-section-title">
              <span>Select Dimension</span>
              <button 
                onClick={() => setIsSizeChartOpen(true)}
                style={{ background: 'none', border: 'none', color: 'var(--color-mint)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}
              >
                <Ruler size={12} /> Size Guide
              </button>
            </div>
            <div className="haya-size-options-grid">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  className={`haya-details-size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector & Add to Cart button */}
          <div>
            <div className="haya-details-section-title">Quantity & Purchase</div>
            <div className="haya-purchase-controls">
              <div className="haya-quantity-selector">
                <button className="haya-qty-btn" onClick={() => handleQuantityChange('dec')}>-</button>
                <span className="haya-qty-value">{quantity}</span>
                <button className="haya-qty-btn" onClick={() => handleQuantityChange('inc')}>+</button>
              </div>

              <button className="haya-btn" style={{ flex: 1, height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleAddToCartClick}>
                <ShoppingBag size={14} /> Secure Purchase
              </button>

              <button className={`haya-details-favorite-btn ${isFavorited ? 'active' : ''}`} onClick={() => setIsFavorited(!isFavorited)}>
                <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Interactive Accordion Details */}
          <div className="haya-accordion-group">
            
            <div className="haya-accordion-header" onClick={() => toggleSection('story')}>
              <span>Heritage & Craftsmanship</span>
              {openSection === 'story' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            {openSection === 'story' && (
              <div className="haya-accordion-body">
                {product.heritageStory}
              </div>
            )}

            <div className="haya-accordion-header" onClick={() => toggleSection('care')}>
              <span>Fabric & Care Specifications</span>
              {openSection === 'care' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            {openSection === 'care' && (
              <div className="haya-accordion-body">
                Woven using premium <strong>{product.fabric}</strong> fibers. 
                <br /><br />
                <strong>Care Instructions:</strong> Dry clean highly recommended to preserve embroidery structures and fine weaves. Alternatively, hand wash cold with luxury silk detergent. Iron warm inside out. Do not tumble dry.
              </div>
            )}

            <div className="haya-accordion-header" onClick={() => toggleSection('shipping')}>
              <span>Modest Fit & Shipping</span>
              {openSection === 'shipping' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
            {openSection === 'shipping' && (
              <div className="haya-accordion-body">
                Our designs are crafted for an elegant, modest, and flowing drape. Standard abaya lengths vary by size (S: 54", M: 56", L: 58", XL: 60").
                <br /><br />
                <strong>Artisanal Shipping:</strong> Hand-packed in our custom linen bags and shipped globally. Domestic delivery takes 2-4 business days. International delivery takes 5-9 business days with customs clearance handled.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* --- Size Guide Dialog --- */}
      {isSizeChartOpen && (
        <div className="haya-size-modal-overlay" onClick={() => setIsSizeChartOpen(false)}>
          <div className="haya-size-modal" onClick={e => e.stopPropagation()}>
            <h3 className="haya-catalog-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Atelier Dimension Guide</h3>
            <p style={{ fontSize: '12px', color: 'var(--color-brown-light)', marginBottom: '16px' }}>
              Standard heights and lengths for an elegant modest drape.
            </p>

            <table className="haya-size-table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (in)</th>
                  <th>Length (in)</th>
                  <th>Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>S</strong></td>
                  <td>36 - 38</td>
                  <td>54</td>
                  <td>27</td>
                </tr>
                <tr>
                  <td><strong>M</strong></td>
                  <td>39 - 41</td>
                  <td>56</td>
                  <td>28</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>42 - 44</td>
                  <td>58</td>
                  <td>29</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>45 - 47</td>
                  <td>60</td>
                  <td>30</td>
                </tr>
              </tbody>
            </table>

            <button className="haya-btn" style={{ width: '100%', marginTop: '24px' }} onClick={() => setIsSizeChartOpen(false)}>
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
};