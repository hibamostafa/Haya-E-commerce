import React, { useState, useEffect, useRef } from 'react';

// --- Type Definitions ---
export interface CollectionItem {
  label: string;
  href: string;
}

interface HayaNavbarProps {
  cartCount: number;
  onCartClick?: () => void;
  logoHref?: string;
  announcementText?: string;
  collectionItems?: CollectionItem[];
  onLogoClick?: (e: React.MouseEvent) => void;
  onCollectionClick?: (e: React.MouseEvent, categoryName: string) => void;
}

const DEFAULT_COLLECTIONS: CollectionItem[] = [
  { label: 'Abayas & Kaftans', href: '#abayas' },
  { label: 'Bishts', href: '#bishts' },
  { label: 'Modest Dresses', href: '#dresses' },
  { label: 'Hijabs & Scarves', href: '#hijabs' }
];

export const HayaNavbar: React.FC<HayaNavbarProps> = ({
  cartCount,
  onCartClick,
  logoHref = "#",
  announcementText = "Complimentary worldwide express shipping on orders over $250",
  collectionItems = DEFAULT_COLLECTIONS,
  onLogoClick,
  onCollectionClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<boolean>(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500;600&family=Gulzar&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap');

        :root {
          --haya-bg: #FCFBF9;
          --haya-bg-glass: rgba(252, 251, 249, 0.96);
          --haya-text: #232220;
          --haya-text-muted: #706E6B;
          --haya-accent: #B89C7B;
          --haya-border: rgba(35, 34, 32, 0.08);
          --transition-smooth: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          --transition-fast: all 0.25s ease;
        }

        .haya-announcement {
          background-color: var(--haya-text);
          color: var(--haya-bg);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          padding: 10px 20px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1002;
          transition: var(--transition-smooth);
          transform: translateY(0);
        }

        .haya-announcement.hidden {
          transform: translateY(-100%);
        }

        .haya-header-wrapper {
          position: fixed;
          top: ${scrolled ? '0px' : '36px'};
          left: 0;
          width: 100%;
          z-index: 1001;
          transition: var(--transition-smooth);
        }

        .haya-header {
          background-color: var(--haya-bg-glass);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${scrolled ? 'var(--haya-border)' : 'transparent'};
          transition: var(--transition-smooth);
        }

        .haya-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1600px;
          margin: 0 auto;
          padding: ${scrolled ? '14px 40px' : '26px 40px'};
          transition: var(--transition-smooth);
        }

        .haya-nav-left {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .haya-nav-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .haya-nav-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 28px;
        }

        .haya-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--haya-text);
          flex-shrink: 0;
        }

        .haya-logo-latin {
          font-family: 'Cormorant Garamond', serif;
          font-size: ${scrolled ? '24px' : '28px'};
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: var(--transition-smooth);
          line-height: 1;
        }

        .haya-logo-divider {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: var(--haya-accent);
          clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
          margin: 0 12px;
          transition: var(--transition-smooth);
          transform: rotate(0deg);
        }

        .haya-logo-link:hover .haya-logo-divider {
          transform: rotate(45deg);
        }

        .haya-logo-arabic {
          font-family: 'Gulzar', 'Noto Nastaliq Urdu', serif;
          font-size: ${scrolled ? '22px' : '28px'};
          color: var(--haya-accent);
          transition: var(--transition-smooth);
          line-height: 1.2;
          direction: rtl;
          margin-top: -4px;
        }

        .haya-nav-menu {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
        }

        .haya-nav-item {
          position: relative;
        }

        .haya-nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--haya-text);
          padding: 12px 0;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-fast);
        }

        .haya-nav-link:hover, .haya-nav-item:hover > .haya-nav-link {
          color: var(--haya-accent);
        }

        .haya-dropdown-arrow {
          transition: transform 0.3s ease;
        }

        .haya-nav-item:hover .haya-dropdown-arrow {
          transform: rotate(180deg);
        }

        .haya-dropdown-panel {
          position: absolute;
          top: 100%;
          left: 0;
          transform: translateY(10px);
          background-color: var(--haya-bg);
          border: 1px solid var(--haya-border);
          padding: 24px;
          min-width: 240px;
          opacity: 0;
          visibility: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.05);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 1005;
          border-radius: 4px;
        }

        .haya-nav-item:hover .haya-dropdown-panel {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .haya-dropdown-item {
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: var(--haya-text-muted);
          transition: var(--transition-fast);
          padding: 4px 0;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .haya-dropdown-item:hover {
          color: var(--haya-accent);
          transform: translateX(4px);
        }

        .haya-dropdown-item::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--haya-accent);
          opacity: 0;
          transition: var(--transition-fast);
        }

        .haya-dropdown-item:hover::before {
          opacity: 1;
        }

        .haya-icon-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--haya-text);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .haya-icon-button:hover {
          color: var(--haya-accent);
        }

        .haya-badge {
          position: absolute;
          top: -4px;
          right: -8px;
          background-color: var(--haya-accent);
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .haya-hamburger {
          display: none;
        }

        .haya-search-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: var(--haya-bg);
          border-bottom: 1px solid var(--haya-border);
          padding: 30px 40px;
          transform: translateY(-10px);
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-smooth);
          z-index: 998;
          box-shadow: 0 10px 20px rgba(0,0,0,0.02);
        }

        .haya-search-drawer.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .haya-search-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          position: relative;
        }

        .haya-search-input {
          width: 100%;
          border: none;
          border-bottom: 1px solid var(--haya-text);
          background: transparent;
          padding: 12px 40px 12px 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: var(--haya-text);
          outline: none;
        }

        .haya-search-input::placeholder {
          color: #A09E9B;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          letter-spacing: 0.05em;
        }

        .haya-search-close {
          position: absolute;
          right: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--haya-text-muted);
          transition: var(--transition-fast);
        }

        .haya-search-close:hover {
          color: var(--haya-text);
        }

        .haya-mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: var(--haya-bg);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding: 100px 40px 40px 40px;
          box-sizing: border-box;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
        }

        .haya-mobile-drawer.open {
          opacity: 1;
          pointer-events: auto;
        }

        .haya-mobile-nav {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .haya-mobile-nav-item {
          border-bottom: 1px solid rgba(35, 34, 32, 0.05);
          padding-bottom: 16px;
        }

        .haya-mobile-header-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          color: var(--haya-text);
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 0.05em;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          padding: 0;
          cursor: pointer;
        }

        .haya-mobile-accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 0;
        }

        .haya-mobile-accordion-content.expanded {
          max-height: 300px;
          padding-top: 16px;
        }

        .haya-mobile-sublink {
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          color: var(--haya-text-muted);
          padding-left: 10px;
        }

        @media (max-width: 1024px) {
          .haya-nav-left .haya-nav-menu {
            display: none;
          }
          .haya-hamburger {
            display: flex;
          }
          .haya-nav {
            padding: ${scrolled ? '12px 24px' : '18px 24px'};
          }
          .haya-header-wrapper {
            top: ${scrolled ? '0px' : '36px'};
          }
        }
      `}</style>

      <div className={`haya-announcement ${scrolled ? 'hidden' : ''}`} role="alert">
        {announcementText}
      </div>

      <div className="haya-header-wrapper">
        <header className="haya-header">
          <nav className="haya-nav" role="navigation" aria-label="Main Navigation">
            
            <div className="haya-nav-left">
              <button 
                className="haya-icon-button haya-hamburger" 
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d={mobileMenuOpen ? "M18 6L6 18M6 6l12 12" : "M4 7h16M4 17h16"} />
                </svg>
              </button>

              <ul className="haya-nav-menu">
                <li className="haya-nav-item">
                  <a 
                    href="#collection" 
                    className="haya-nav-link"
                    onClick={(e) => {
                      if (onCollectionClick) {
                        e.preventDefault();
                        onCollectionClick(e, 'All');
                      }
                    }}
                  >
                    Collections
                    <svg className="haya-dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </a>
                  
                  {collectionItems && (
                    <div className="haya-dropdown-panel">
                      {collectionItems.map((sub, sIdx) => (
                        <a 
                          key={sIdx} 
                          href={sub.href} 
                          className="haya-dropdown-item"
                          onClick={(e) => {
                            if (onCollectionClick) {
                              e.preventDefault();
                              onCollectionClick(e, sub.label);
                            }
                          }}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              </ul>
            </div>

            <div className="haya-nav-center">
              <a 
                href={logoHref} 
                className="haya-logo-link"
                onClick={(e) => {
                  if (onLogoClick) {
                    e.preventDefault();
                    onLogoClick(e);
                  }
                }}
              >
                <span className="haya-logo-latin">Haya’</span>
                <span className="haya-logo-divider" aria-hidden="true"></span>
                <span className="haya-logo-arabic">حياء</span>
              </a>
            </div>

            <div className="haya-nav-right">
              <button 
                className="haya-icon-button" 
                aria-label="Toggle Search" 
                onClick={toggleSearch}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              <button 
                className="haya-icon-button" 
                aria-label={`Shopping Cart, ${cartCount} items`} 
                onClick={onCartClick}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M5 7h14l-1.5 10H6.5L5 7Z" />
                  <path d="M9 7V4a3 3 0 0 1 6 0v3" />
                </svg>
                {cartCount > 0 && <span className="haya-badge">{cartCount}</span>}
              </button>
            </div>
          </nav>

          <div className={`haya-search-drawer ${searchOpen ? 'open' : ''}`}>
            <div className="haya-search-container">
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="What are you looking for?" 
                className="haya-search-input"
              />
              <button 
                className="haya-search-close" 
                aria-label="Close Search" 
                onClick={() => setSearchOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className={`haya-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={mobileMenuOpen ? 'false' : 'true'}>
        <ul className="haya-mobile-nav">
          <li className="haya-mobile-nav-item">
            <button 
              className="haya-mobile-header-link"
              onClick={() => setExpandedMobileItem(!expandedMobileItem)}
              aria-expanded={expandedMobileItem}
            >
              <span>Collections</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2"
                style={{ 
                  transform: expandedMobileItem ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease' 
                }}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <div className={`haya-mobile-accordion-content ${expandedMobileItem ? 'expanded' : ''}`}>
              {collectionItems.map((sub, sIdx) => (
                <a 
                  key={sIdx} 
                  href={sub.href} 
                  className="haya-mobile-sublink"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (onCollectionClick) {
                      e.preventDefault();
                      onCollectionClick(e, sub.label);
                    }
                  }}
                >
                  {sub.label}
                </a>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HayaNavbar;