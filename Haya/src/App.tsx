import { useState, type ComponentType } from 'react';
import HomePage from './page/HomePage';
import Navbar from './component/navbar';
import ProductPage, { type Product } from './page/ProductPage'; // Imported Product type
import { ProductDetailsPage } from './page/ProductDetails'; // Imported Details Page

function App() {
  const [cartCount, setCartCount] = useState(0);
  
  // State-based routing to switch pages
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'details' | 'admin'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Track selected product for details page
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleAddToCartWithDetails = (product: Product, size: string, qty: number) => {
    setCartCount(prev => prev + qty);
  };

  const handleOpenCart = () => {
    console.log("Opening Cart View...");
  };

  const HomePageWithProps = HomePage as ComponentType<{ onAddToCart: () => void }>;
  
  // Expanded type cast to support transition callback
  const ProductPageWithProps = ProductPage as ComponentType<{ 
    onAddToCart: () => void; 
    initialCategory: string; 
    onExamineProduct: (product: Product) => void;
  }>;

  return (
    <div className="App">
      {/* 1. Navbar handles routing updates */}
      <Navbar 
        cartCount={cartCount} 
        onCartClick={handleOpenCart} 
        onLogoClick={() => {
          setCurrentView('home');
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onCollectionClick={(e, category) => {
          setActiveCategory(category);
          setCurrentView('products');
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Conditional Page Rendering */}
      {currentView === 'home' && (
        <HomePageWithProps onAddToCart={handleAddToCart} />
      )}

      {currentView === 'products' && (
        <ProductPageWithProps 
          onAddToCart={handleAddToCart} 
          initialCategory={activeCategory} 
          onExamineProduct={(product) => {
            setSelectedProduct(product);
            setCurrentView('details');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'details' && selectedProduct && (
        <ProductDetailsPage 
          product={selectedProduct} 
          onBack={() => {
            setCurrentView('products');
            setSelectedProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAddToCart={handleAddToCartWithDetails}
        />
      )}


      {/* 3. Subtle Admin/Atelier Floating Access Key */}
      <button
        onClick={() => {
          setCurrentView(prev => prev === 'admin' ? 'home' : 'admin');
          setSelectedProduct(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#4A3B32',
          color: '#FCFBF9',
          border: '1px solid rgba(140, 122, 107, 0.2)',
          borderRadius: '50px',
          padding: '12px 20px',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          zIndex: 9999,
          transition: 'all 0.3s ease'
        }}
      >
        {currentView === 'admin' ? 'Exit Atelier' : 'Atelier Access'}
      </button>
    </div>
  );
}

export default App;