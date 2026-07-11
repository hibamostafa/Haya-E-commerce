import React, { useState } from 'react';
import Navbar from '../component/navbar';

// --- Type Definitions ---
interface Product {
  id: number;
  name: string;
  arabicName: string;
  category: string;
  price: string;
  color: string;
  imageUrl: string;
  description: string;
}

// --- Sample Products Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Mint Arabesque Abaya",
    arabicName: "عباية الأرابيسك الأخاذة",
    category: "Abayas",
    price: "$145.00",
    color: "Mint / Sand Beige",
    imageUrl: "https://i.pinimg.com/736x/86/b1/3e/86b13e9da1024de55a797501f9b0f66f.jpg",
    description: "Premium crinkle crepe with minimalist, tone-on-tone geometric embroidery along the inner lapel and cuffs."
  },
  {
    id: 2,
    name: "The Desert Dunes Bisht",
    arabicName: "بشت كثبان الصحراء",
    category: "Bisht",
    price: "$135.00",
    color: "Sand / Earthy Brown",
    imageUrl: "https://i.pinimg.com/736x/81/15/fc/8115fc8a86340c97ccbb6574cc183501.jpg",
    description: "Breathable linen-viscose blend featuring deep earthy brown contrast piping and a relaxed, graceful drape."
  },
  {
    id: 3,
    name: "The Earth & Sage Layered Set",
    arabicName: "طقم الأرض والمرمر",
    category: "Modest Sets",
    price: "$165.00",
    color: "Umber / Soft Sage",
    imageUrl: "https://i.pinimg.com/736x/ea/3a/c6/ea3ac6e5adfc7380de194c9ed2cb45f0.jpg",
    description: "Two-piece premium Japanese satin set offering a structured dark brown abaya with a modern mint inner slip."
  }
];

export const HayaHomepage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="haya-container">
      {/* Dynamic CSS Styling Injector */}
      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500;600&family=Gulzar&family=Aref+Ruqaa:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap');
        
        /* CSS Variables */
        .haya-hero-headline span {
          display: block;
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          color: var(--color-brown-light);
          margin-top: 22px;
          font-size: 1.25em; /* Scaled up so the cascading pen strokes render cleanly */
          line-height: 2.2;  /* Essential breathing room for cascading curves and dots */
          direction: rtl;
          text-align: right;
          font-weight: 300;
        }

        :root {
          --color-beige: #F5F2EB;
          --color-brown-dark: #4A3B32;
          --color-brown-light: #8C7A6B;
          --color-mint: #A3B899;
          --color-mint-light: #EBF0E9;
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-sans: 'Montserrat', Helvetica, sans-serif;
          --transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          
          /* 
            An intricate, highly detailed, seamless repeating damask vector tile pattern.
            Symmetrical geometric grid layout featuring alternating diamond-centered medallions 
            at the center, radiating four-pointed stylized floral centers, and elaborate 
            abstract S-curves, C-curves, swirling vines, and curlicues. 
            Warm tan, light beige, and pale cream monochromatic palette.
          */
          --pattern-persian-arabesque: url("data:image/svg+xml,%3Csvg width='240' height='240' viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cg id='q'%3E%3Cpath d='M120,120 C105,100 80,80 40,40 C20,20 10,10 0,0' stroke='%23D7CDBB' stroke-width='1.2' stroke-linecap='round' fill='none'/%3E%3Cpath d='M80,80 C60,60 40,60 40,80 C40,100 60,110 70,95 C80,80 70,70 60,70 C50,70 50,80 55,85' stroke='%23D7CDBB' stroke-width='1' stroke-linecap='round' fill='none'/%3E%3Cpath d='M100,100 C110,80 110,60 90,60 C70,60 60,75 75,90 C90,105 100,95 95,90' stroke='%23EBE3D5' stroke-width='1' stroke-linecap='round' fill='none'/%3E%3Cpath d='M0,0 C20,10 30,30 20,45 C10,60 0,50 5,40 C10,30 25,30 30,15' stroke='%23D7CDBB' stroke-width='1' stroke-linecap='round' fill='none'/%3E%3Cpath d='M120,120 Q110,100 115,85 Q120,100 120,120' stroke='%23C0B39C' stroke-width='1' fill='none'/%3E%3Cpath d='M120,0 C100,15 70,15 45,0' stroke='%23EBE3D5' stroke-width='0.8' stroke-linecap='round' fill='none'/%3E%3Cpath d='M0,120 C15,100 15,70 0,45' stroke='%23EBE3D5' stroke-width='0.8' stroke-linecap='round' fill='none'/%3E%3Cpath d='M60,60 C65,45 80,35 95,40 C110,45 110,60 95,65 C80,70 70,60 75,55' stroke='%23C0B39C' stroke-width='0.8' fill='none'/%3E%3C/g%3E%3C/defs%3E%3Crect width='240' height='240' fill='%23F5F2EB'/%3E%3Cg stroke='none' fill='none'%3E%3Cuse href='%23q'/%3E%3Cuse href='%23q' transform='translate(240, 0) scale(-1, 1)'/%3E%3Cuse href='%23q' transform='translate(0, 240) scale(1, -1)'/%3E%3Cuse href='%23q' transform='translate(240, 240) scale(-1, -1)'/%3E%3C/g%3E%3Cpolygon points='120,105 135,120 120,135 105,120' stroke='%23C0B39C' stroke-width='1.2' fill='none'/%3E%3Ccircle cx='120' cy='120' r='5' fill='%23D7CDBB'/%3E%3Cpolygon points='0,15 15,0 0,-15 -15,0' transform='translate(120, 0)' stroke='%23C0B39C' stroke-width='1' fill='none'/%3E%3Cpolygon points='0,15 15,0 0,-15 -15,0' transform='translate(120, 240)' stroke='%23C0B39C' stroke-width='1' fill='none'/%3E%3Cpolygon points='0,15 15,0 0,-15 -15,0' transform='translate(0, 120)' stroke='%23C0B39C' stroke-width='1' fill='none'/%3E%3Cpolygon points='0,15 15,0 0,-15 -15,0' transform='translate(240, 120)' stroke='%23C0B39C' stroke-width='1' fill='none'/%3E%3C/svg%3E");
          --pattern-arabesque-dark: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L33.5 26.5L60 30L33.5 33.5L30 60L26.5 33.5L0 30L26.5 26.5Z' fill='%23F5F2EB' fill-opacity='0.03'/%3E%3C/svg%3E");
        }

        /* Animations */
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Base Reset */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: var(--color-beige);
          background-image: var(--pattern-persian-arabesque);
          background-repeat: repeat;
          background-size: 280px;
          color: var(--color-brown-dark);
          font-family: var(--font-sans);
          font-size: 15px;
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: var(--color-beige);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--color-brown-light);
        }

        .haya-container {
          overflow-x: hidden;
        }

        /* Header / Navbar */
        .haya-header {
          position: sticky;
          top: 0;
          background-color: rgba(245, 242, 235, 0.94);
          backdrop-filter: blur(15px);
          z-index: 1000;
          border-bottom: 1px solid rgba(74, 59, 50, 0.08);
          transition: var(--transition);
        }

        .haya-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 40px;
        }

        .haya-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: var(--color-brown-dark);
          position: relative;
        }

        .haya-logo-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 400;
          letter-spacing: 6px;
          text-transform: uppercase;
          line-height: 1;
        }

        .haya-logo-arabic {
          font-family: var(--font-serif);
          font-size: 13px;
          letter-spacing: 2px;
          margin-top: 4px;
          color: var(--color-brown-light);
        }

        .haya-nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .haya-nav-links a {
          text-decoration: none;
          color: var(--color-brown-dark);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 6px;
          transition: var(--transition);
        }

        .haya-nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--color-mint);
          transition: var(--transition);
        }

        .haya-nav-links a:hover::after {
          width: 100%;
        }

        .haya-nav-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .haya-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-brown-dark);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }
        
        .haya-icon-btn:hover {
          color: var(--color-mint);
          transform: translateY(-2px);
        }

        .haya-cart-badge {
          position: absolute;
          top: -6px;
          right: -10px;
          background-color: var(--color-brown-light);
          color: var(--color-beige);
          font-size: 9px;
          font-weight: 500;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .haya-menu-toggle {
          display: none;
        }

        /* Hero Section - Above-the-Fold Laptop Viewport Alignment */
        .haya-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          background-color: transparent;
          position: relative;
        }

        /* Desktop specific layout rules to lock hero within screen bounds */
        @media (min-width: 1025px) {
          .haya-hero {
            height: calc(100vh - 81px);
            max-height: calc(100vh - 81px);
            max-width: 1400px;
            margin: 0 auto;
            overflow: hidden;
          }

          .haya-hero-image-wrapper {
            height: calc(100% - 40px);
            margin: 20px 20px 20px 40px !important;
            border-radius: 180px 180px 0 0 !important;
          }

          .haya-hero-content {
            height: 100%;
            padding: 40px 60px 40px 20px !important;
            justify-content: center;
          }
        }

        .haya-hero-image-wrapper {
          position: relative;
          background-color: var(--color-mint-light);
          overflow: hidden;
          border-radius: 120px 120px 0 0;
          box-shadow: 0 15px 35px rgba(74, 59, 50, 0.05);
          z-index: 1;
        }

        .haya-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }

        .haya-hero-image-wrapper:hover .haya-hero-image {
          transform: scale(1.06);
        }

        .haya-hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .haya-hero-motif-spinner {
          position: absolute;
          right: 10%;
          top: 15%;
          width: 150px;
          height: 150px;
          opacity: 0.03;
          color: var(--color-brown-dark);
          pointer-events: none;
          animation: slowSpin 40s linear infinite;
        }

        .haya-hero-tagline {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 4px;
          color: var(--color-mint);
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .haya-hero-tagline::before {
          content: '';
          display: block;
          width: 30px;
          height: 1px;
          background-color: var(--color-mint);
        }

        .haya-hero-headline {
          font-family: var(--font-serif);
          font-size: clamp(32px, 3.8vw, 48px);
          font-weight: 300;
          line-height: 1.15;
          color: var(--color-brown-dark);
          margin-bottom: 20px;
          position: relative;
        }

        .haya-hero-headline span {
          display: block;
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--color-brown-light);
          margin-top: 8px;
          font-size: 0.85em;
        }

        .haya-hero-description {
          font-size: 14px;
          font-weight: 300;
          max-width: 440px;
          margin-bottom: 30px;
          color: var(--color-brown-light);
          line-height: 1.8;
        }

        .haya-btn {
          align-self: flex-start;
          background-color: transparent;
          color: var(--color-brown-dark);
          border: 1px solid var(--color-brown-dark);
          padding: 15px 36px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }

        .haya-btn::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-color: var(--color-brown-dark);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          z-index: -1;
        }

        .haya-btn:hover {
          color: var(--color-beige);
          border-color: var(--color-brown-dark);
        }

        .haya-btn:hover::before {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Brand Philosophy Section */
        .haya-philosophy {
          text-align: center;
          max-width: 900px;
          margin: 120px auto;
          padding: 60px 40px;
          position: relative;
          border: 1px solid rgba(74, 59, 50, 0.08);
          outline: 1px solid rgba(74, 59, 50, 0.04);
          outline-offset: -12px;
          background-color: rgba(245, 242, 235, 0.85);
          backdrop-filter: blur(5px);
        }

        .haya-philosophy-sub {
          font-family: var(--font-serif);
          font-size: 20px;
          font-style: italic;
          color: var(--color-mint);
          margin-bottom: 16px;
          display: block;
        }

        .haya-philosophy-title {
          font-family: var(--font-serif);
          font-size: 42px;
          font-weight: 300;
          letter-spacing: 4px;
          margin-bottom: 32px;
          color: var(--color-brown-dark);
        }

        .haya-philosophy-text {
          font-size: 16px;
          line-height: 2;
          font-weight: 300;
          color: var(--color-brown-light);
          max-width: 600px;
          margin: 0 auto;
        }

        .haya-divider {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin: 60px 0 0 0;
        }

        .haya-divider-line {
          height: 1px;
          width: 80px;
          background-color: rgba(74, 59, 50, 0.2);
        }

        .haya-divider-icon {
          width: 24px;
          height: 24px;
          color: var(--color-mint);
          animation: slowSpin 20s linear infinite;
        }

        /* Custom Categories Section Styling - Mihrab Arch Motifs */
        .haya-categories {
          max-width: 1400px;
          margin: 120px auto;
          padding: 0 40px;
        }

        .haya-categories-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .haya-categories-subtitle {
          font-family: var(--font-serif);
          font-size: 18px;
          font-style: italic;
          color: var(--color-mint);
          display: block;
          margin-bottom: 12px;
        }

        .haya-categories-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 300;
          letter-spacing: 3px;
          color: var(--color-brown-dark);
          text-transform: uppercase;
        }

        .haya-category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .haya-category-card {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          background-color: transparent;
          transition: var(--transition);
        }

        .haya-category-image-wrapper {
          position: relative;
          aspect-ratio: 1 / 1.35;
          width: 100%;
          overflow: hidden;
          border-radius: 160px 160px 16px 16px; /* High luxury double curved Mihrab arch */
          border: 1px solid rgba(140, 122, 107, 0.15);
          box-shadow: 0 10px 30px rgba(74, 59, 50, 0.04);
          transition: var(--transition);
        }

        /* Decorative internal Arabesque frame overlaying the category card */
        .haya-category-arch-frame {
          position: absolute;
          top: 15px;
          left: 15px;
          right: 15px;
          bottom: 15px;
          border: 1.5px solid rgba(245, 242, 235, 0.3);
          border-radius: 145px 145px 8px 8px;
          pointer-events: none;
          z-index: 3;
          transition: var(--transition);
        }

        .haya-category-card:hover .haya-category-arch-frame {
          border-color: var(--color-mint);
          transform: scale(0.98);
        }

        .haya-category-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .haya-category-card:hover img {
          transform: scale(1.08);
        }

        .haya-category-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(38, 30, 26, 0.15) 20%, rgba(38, 30, 26, 0.72) 100%);
          z-index: 2;
          transition: var(--transition);
        }

        .haya-category-card:hover .haya-category-overlay {
          background: linear-gradient(to bottom, rgba(38, 30, 26, 0.25) 10%, rgba(38, 30, 26, 0.82) 100%);
        }

        .haya-category-content-box {
          position: absolute;
          bottom: 35px;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 4;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Calligraphic category baseline translation */
        .haya-category-arabic {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 1.45em;
          color: var(--color-beige);
          margin-bottom: 8px;
          line-height: 1.6;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          transition: var(--transition);
        }

        .haya-category-name {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 2.5px;
          color: #ffffff;
          margin-bottom: 12px;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .haya-category-link {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--color-mint);
          font-weight: 500;
          position: relative;
          padding-bottom: 6px;
          transition: var(--transition);
        }

        .haya-category-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background-color: var(--color-mint);
          transition: var(--transition);
        }

        .haya-category-card:hover .haya-category-link::after {
          width: 100%;
        }

        /* --- ENHANCED PRODUCT SECTION STYLES --- */
        .haya-featured {
          max-width: 1400px;
          margin: 140px auto;
          padding: 0 40px;
          position: relative;
        }

        .haya-section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 50px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(140, 122, 107, 0.15);
        }

        .haya-section-title-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .haya-section-subtitle {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--color-mint);
          font-size: 16px;
          letter-spacing: 1px;
        }

        .haya-section-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 300;
          letter-spacing: 2.5px;
          color: var(--color-brown-dark);
          text-transform: uppercase;
        }

        .haya-product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 45px;
        }

        .haya-product-card {
          display: flex;
          flex-direction: column;
          /* --- TRENDY DARK ESPRESSO BROWN SHADE BACKDROP --- */
          background-color: #2E2520; 
          padding: 18px 18px 24px 18px;
          border-radius: 140px 140px 16px 16px; /* Seamless outer arch integration */
          border: 1px solid rgba(140, 122, 107, 0.25);
          box-shadow: 0 10px 30px rgba(42, 34, 30, 0.12);
          transition: var(--transition);
          position: relative;
        }

        .haya-product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(42, 34, 30, 0.25);
          border-color: var(--color-mint);
        }

        .haya-product-image-container {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background-color: var(--color-mint-light);
          border-radius: 122px 122px 0 0; /* Snug inset border fitting */
          margin-bottom: 24px;
          border: 1px solid rgba(245, 242, 235, 0.08);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          transition: var(--transition);
        }

        /* Elegant inner frame lining the archway */
        .haya-product-arch-overlay {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 1px solid rgba(245, 242, 235, 0.2);
          border-radius: 112px 112px 0 0;
          pointer-events: none;
          z-index: 3;
          transition: var(--transition);
        }

        .haya-product-card:hover .haya-product-arch-overlay {
          border-color: var(--color-mint);
          transform: scale(0.98);
        }

        .haya-product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .haya-product-card:hover .haya-product-image {
          transform: scale(1.06);
        }

        /* Sleek hover purchase overlay */
        .haya-product-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(46, 37, 32, 0.9) 30%, transparent 100%);
          padding: 40px 24px 24px 24px;
          opacity: 0;
          transform: translateY(15px);
          transition: var(--transition);
          display: flex;
          justify-content: center;
          z-index: 4;
        }

        .haya-product-card:hover .haya-product-overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .haya-product-btn {
          background-color: var(--color-beige);
          color: var(--color-brown-dark);
          border: 1px solid transparent;
          padding: 15px 28px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          font-weight: 600;
          transition: var(--transition);
          width: 100%;
          border-radius: 2px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .haya-product-btn:hover {
          background-color: var(--color-brown-dark);
          color: var(--color-beige);
          border-color: var(--color-beige);
        }

        .haya-product-info {
          padding: 0 4px;
        }

        .haya-product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .haya-product-category {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(245, 242, 235, 0.65); /* Elegant light cream metadata */
          font-weight: 500;
        }

        .haya-product-arabic {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: 1.25em;
          color: var(--color-mint);
          line-height: 1.4;
        }

        .haya-product-name {
          font-family: var(--font-serif);
          font-size: 23px;
          font-weight: 400;
          color: var(--color-beige); /* Standout high-fashion title */
          text-decoration: none;
          margin-bottom: 8px;
          display: block;
          transition: var(--transition);
          letter-spacing: 0.5px;
        }
        
        .haya-product-name:hover {
          color: var(--color-mint);
        }

        .haya-product-desc {
          font-size: 13px;
          color: rgba(245, 242, 235, 0.7); /* Subtle read-out text */
          font-weight: 300;
          margin-bottom: 18px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.6;
        }

        /* Dashed separation separator */
        .haya-product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px dashed rgba(245, 242, 235, 0.15); 
        }

        .haya-product-color-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .haya-product-color-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-mint);
          display: inline-block;
        }

        .haya-product-color-text {
          font-size: 11px;
          color: rgba(245, 242, 235, 0.6);
          font-weight: 400;
          letter-spacing: 0.5px;
        }

        .haya-product-price {
          font-family: var(--font-serif);
          font-weight: 600;
          font-size: 18px;
          color: var(--color-mint); /* Highlighted price tag in sage */
          letter-spacing: 0.5px;
        }

        /* Call To Action / Artistry Section */
        .haya-artistry {
          background-color: var(--color-brown-dark);
          color: var(--color-beige);
          padding: 100px 0;
          position: relative;
          overflow: hidden;
          background-image: var(--pattern-arabesque-dark);
          background-size: 100px;
        }

        .haya-artistry-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .haya-artistry-text {
          position: relative;
          z-index: 2;
        }

        .haya-artistry-title {
          font-family: var(--font-serif);
          font-size: 44px;
          font-weight: 300;
          margin-bottom: 24px;
          letter-spacing: 2px;
          line-height: 1.2;
        }

        .haya-artistry-desc {
          font-size: 15px;
          line-height: 2;
          font-weight: 300;
          color: rgba(245, 242, 235, 0.8);
          margin-bottom: 40px;
        }

        .haya-artistry-image-container {
          position: relative;
          padding: 20px;
          border: 1px solid rgba(163, 184, 153, 0.3);
          transform: rotate(2deg);
          transition: var(--transition);
        }
        
        .haya-artistry-image-container::before {
          content: '';
          position: absolute;
          top: -20px; left: -20px; right: 20px; bottom: 20px;
          border: 1px solid rgba(245, 242, 235, 0.1);
          transform: rotate(-4deg);
          z-index: 0;
        }
        
        .haya-artistry-image-container:hover {
          transform: rotate(0deg);
        }

        .haya-artistry-image {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          position: relative;
          z-index: 1;
        }

        /* Newsletter Sign Up Section */
        .haya-newsletter {
          background-color: rgba(235, 240, 233, 0.9);
          backdrop-filter: blur(5px);
          padding: 100px 40px;
          text-align: center;
          position: relative;
        }

        .haya-newsletter-box {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .haya-newsletter-title {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 300;
          margin-bottom: 16px;
          letter-spacing: 2px;
          color: var(--color-brown-dark);
        }

        .haya-newsletter-desc {
          font-size: 14px;
          color: var(--color-brown-light);
          font-weight: 300;
          margin-bottom: 40px;
        }

        .haya-newsletter-form {
          display: flex;
          gap: 0;
          box-shadow: 0 10px 30px rgba(74, 59, 50, 0.05);
        }

        .haya-input {
          flex: 1;
          background-color: #fff;
          border: none;
          padding: 20px 24px;
          font-size: 13px;
          color: var(--color-brown-dark);
          font-family: var(--font-sans);
          outline: none;
        }

        .haya-input::placeholder {
          color: #BDB4AC;
          letter-spacing: 1px;
        }

        .haya-newsletter-form .haya-btn {
          background-color: var(--color-brown-dark);
          color: var(--color-beige);
          border: none;
          padding: 0 40px;
        }
        
        .haya-newsletter-form .haya-btn:hover {
          background-color: var(--color-mint);
        }
        
        .haya-newsletter-form .haya-btn::before {
          display: none;
        }

        .haya-newsletter-success {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--color-mint);
          font-size: 20px;
          animation: fadeIn 0.5s ease;
        }

        /* Footer */
        .haya-footer {
          background-color: #261E1A;
          color: var(--color-beige);
          padding: 100px 40px 40px 40px;
          position: relative;
        }

        .haya-footer-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          border-bottom: 1px solid rgba(245, 242, 235, 0.05);
          padding-bottom: 80px;
        }

        .haya-footer-brand {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .haya-footer-title {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 300;
          letter-spacing: 5px;
          text-transform: uppercase;
        }

        .haya-footer-brand-text {
          font-size: 13px;
          color: rgba(245, 242, 235, 0.6);
          line-height: 2;
          max-width: 320px;
          font-weight: 300;
        }

        .haya-footer-col h4 {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 32px;
          color: var(--color-mint);
        }

        .haya-footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .haya-footer-col a {
          text-decoration: none;
          color: rgba(245, 242, 235, 0.6);
          font-size: 13px;
          font-weight: 300;
          transition: var(--transition);
          display: inline-block;
        }

        .haya-footer-col a:hover {
          color: var(--color-beige);
          transform: translateX(4px);
        }

        .haya-footer-bottom {
          max-width: 1400px;
          margin: 40px auto 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(245, 242, 235, 0.4);
          text-transform: uppercase;
        }

        /* Media Queries (Responsive Design) */
        @media (max-width: 1024px) {
          .haya-nav-links { display: none; }
          .haya-menu-toggle { display: flex; }
          
          .haya-hero {
            grid-template-columns: 1fr;
            margin: 0;
            height: auto;
            max-height: none;
            overflow: visible;
          }

          .haya-hero-image-wrapper {
            margin: 20px;
            min-height: 50vh;
            border-radius: 120px 120px 0 0;
          }

          .haya-hero-content {
            padding: 60px 24px;
            text-align: center;
            align-items: center;
          }

          .haya-hero-description {
            margin: 0 auto 32px auto;
          }

          .haya-btn { align-self: center; }

          .haya-product-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .haya-artistry-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .haya-artistry-image-container {
            margin: 40px auto 0 auto;
            max-width: 600px;
          }

          .haya-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 600px) {
          .haya-product-grid {
            grid-template-columns: 1fr;
          }

          .haya-footer-grid {
            grid-template-columns: 1fr;
          }

          .haya-newsletter-form {
            flex-direction: column;
          }
          
          .haya-newsletter-form .haya-btn {
            padding: 20px;
          }

          .haya-footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }
      `}</style>


      {/* Hero Section */}
      <section className="haya-hero" id="new">
        <div className="haya-hero-image-wrapper" style={{
          width: '100%',
    maxWidth: '750px',       // Won't get wider than your original size
    aspectRatio: '750 / 850', // Keeps your exact custom proportions perfectly
    overflow: 'hidden',       // Clips the image inside so 'cover' works
    position: 'relative', 
    top: '150px',             // Pushes it down (make sure your layout has room for this!)
    left: '0px',
        }}>
          <img 
            src="https://i.pinimg.com/1200x/44/59/8b/44598bf225eb8e25554a6574b0418023.jpg" 
            alt="Modest Flowing Sage Fabric" 
            className="haya-hero-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div 
          className="haya-hero-content" 
          style={{  
            backgroundColor: 'rgba(245, 242, 235, 0.85)', 
            backdropFilter: 'blur(5px)',
            opacity: '0.85',
            borderRadius: '11px',
            width: '80%',
            height: '80%',
            padding: '40px',
            // --- POSITIONING CONTROLS ---
            position: 'relative', 
            top: '150px', 
            left: '0px',
          }}
        >
          <span className="haya-hero-tagline">Grace in Modesty</span>
          <h1 className="haya-hero-headline">
            Timeless Tailoring.
            {/* Clean calligraphic rendering wrapper */}
            <span style={{
              display: 'block',
              fontFamily: "'Gulzar', 'Noto Nastaliq Urdu', serif", 
              color: 'var(--color-brown-light)',
              marginTop: '16px',
              fontSize: '1.05em',
              lineHeight: '2.2',
              direction: 'rtl',
              textAlign: 'left'
            }}>
              الجمال في الحياء
            </span>
          </h1>
          <p className="haya-hero-description" style={{ marginTop: '16px' }}>
            Experience our newly crafted abayas blending earthy linens, premium Japanese silks, and minimalist Arabic embroidery. Curated for the modern wardrobe.
          </p>
          <button className="haya-btn" onClick={handleAddToCart}>Explore the Debut Edit</button>
        </div>
      </section>

      {/* Custom Categories Section filled with Arabic Mihrab motifs */}
      <section className="haya-categories" id="categories">
        <div className="haya-categories-header">
          <span className="haya-categories-subtitle">Architectural Silhouettes</span>
          <h2 className="haya-categories-title">Shop By Silhouette</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none" stroke="currentColor">
              <path d="M0,10 L32,10 M48,10 L80,10" stroke="var(--color-brown-light)" strokeWidth="0.8" opacity="0.4" />
              {/* Symmetrical central diamond vector */}
              <polygon points="40,5 45,10 40,15 35,10" fill="var(--color-mint)" stroke="var(--color-brown-light)" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        <div className="haya-category-grid">
          {/* Category Card 1: Abayas */}
          <div className="haya-category-card">
            <div className="haya-category-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/86/b1/3e/86b13e9da1024de55a797501f9b0f66f.jpg" 
                alt="Classical Abayas" 
              />
              <div className="haya-category-overlay"></div>
              <div className="haya-category-arch-frame"></div>
              <div className="haya-category-content-box">
                <span className="haya-category-arabic">العبايات</span>
                <h3 className="haya-category-name">Abayas</h3>
                <span className="haya-category-link">Explore Edit</span>
              </div>
            </div>
          </div>

          {/* Category Card 2: Bisht & Capes */}
          <div className="haya-category-card">
            <div className="haya-category-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/81/15/fc/8115fc8a86340c97ccbb6574cc183501.jpg" 
                alt="Traditional Bishts" 
              />
              <div className="haya-category-overlay"></div>
              <div className="haya-category-arch-frame"></div>
              <div className="haya-category-content-box">
                <span className="haya-category-arabic">البشوت</span>
                <h3 className="haya-category-name">Bishts</h3>
                <span className="haya-category-link">Explore Edit</span>
              </div>
            </div>
          </div>

          {/* Category Card 3: Modular Layered Sets */}
          <div className="haya-category-card">
            <div className="haya-category-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/ea/3a/c6/ea3ac6e5adfc7380de194c9ed2cb45f0.jpg" 
                alt="Modular Layered Sets" 
              />
              <div className="haya-category-overlay"></div>
              <div className="haya-category-arch-frame"></div>
              <div className="haya-category-content-box">
                <span className="haya-category-arabic">الأطقم الرائعة</span>
                <h3 className="haya-category-name">Modest Sets</h3>
                <span className="haya-category-link">Explore Edit</span>
              </div>
            </div>
          </div>
        </div>
      </section>
            {/* Brand Philosophy */}
      <section className="haya-philosophy" id="philosophy">
        <span className="haya-philosophy-sub">The Art of Decency</span>
        <h2 className="haya-philosophy-title">Haya’ (حياء)</h2>
        <p className="haya-philosophy-text">
          Modesty is not an understatement; it is a profound form of self-expression. We strive to craft pieces that honor traditional heritage through minimalist design, offering flowing silhouettes, delicate handiwork, and a sophisticated touch of quiet elegance.
        </p>
        <div className="haya-divider">
          <span className="haya-divider-line"></span>
          <svg className="haya-divider-icon" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
          </svg>
          <span className="haya-divider-line"></span>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section className="haya-featured" id="collection">
        <div className="haya-section-header">
          <div className="haya-section-title-group">
            <span className="haya-section-subtitle">Exquisite Artistry</span>
            <h2 className="haya-section-title">The Debut Collection</h2>
          </div>
          <a href="#all" className="haya-section-link">View All Designs</a>
        </div>

        <div className="haya-product-grid">
          {PRODUCTS.map(product => (
            <article key={product.id} className="haya-product-card">
              <div className="haya-product-image-container">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="haya-product-image"
                />
                <div className="haya-product-arch-overlay"></div>
                <div className="haya-product-overlay">
                  <button className="haya-product-btn" onClick={handleAddToCart}>
                    Quick Add to Bag
                  </button>
                </div>
              </div>
              
              <div className="haya-product-info">
                <div className="haya-product-meta">
                  <span className="haya-product-category">{product.category}</span>
                  <span className="haya-product-arabic">{product.arabicName}</span>
                </div>
                <a href="#view" className="haya-product-name">{product.name}</a>
                <p className="haya-product-desc">{product.description}</p>
                <div className="haya-product-footer">
                  <div className="haya-product-color-group">
                    <span className="haya-product-color-dot"></span>
                    <span className="haya-product-color-text">{product.color}</span>
                  </div>
                  <div className="haya-product-price">{product.price}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    

      {/* Footer */}
      <footer className="haya-footer">
        <div className="haya-footer-grid">
          <div className="haya-footer-brand">
            <h3 className="haya-footer-title">Haya’</h3>
            <p className="haya-footer-brand-text">
              Thoughtfully curated modest essentials celebrating classical Arab culture with minimalist, modern designs.
            </p>
          </div>
          <div className="haya-footer-col">
            <h4>Collection</h4>
            <ul>
              <li><a href="#new">New Releases</a></li>
              <li><a href="#all">Classic Abayas</a></li>
              <li><a href="#sets">Modest Layering</a></li>
              <li><a href="#seasonal">Seasonal Edits</a></li>
            </ul>
          </div>
          <div className="haya-footer-col">
            <h4>Heritage</h4>
            <ul>
              <li><a href="#philosophy">Our Story</a></li>
              <li><a href="#journal">The Journal</a></li>
              <li><a href="#artisans">The Artisans</a></li>
              <li><a href="#materials">Sustainability</a></li>
            </ul>
          </div>
          <div className="haya-footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#shipping">Complimentary Shipping</a></li>
              <li><a href="#returns">Returns & Exchange</a></li>
              <li><a href="#sizing">Sizing Blueprint</a></li>
              <li><a href="#contact">Contact Concierge</a></li>
            </ul>
          </div>
        </div>
        
        <div className="haya-footer-bottom">
          <p>© {new Date().getFullYear()} Haya’. Crafted thoughtfully.</p>
          <p>Designed for grace and longevity.</p>
        </div>
      </footer>
    </div>
  );
};

export default HayaHomepage;