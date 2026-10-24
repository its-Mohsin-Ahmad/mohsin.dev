import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { KonohaLogo } from './KonohaLogo';
import { navItems, contactInfo } from '../data/navigation';
import { MobileMenu } from './MobileMenu';
import { Menu, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: isScrolled ? '0.75rem' : '0',
          left: 0,
          right: 0,
          height: 'var(--header-height)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
          }}
        >
          {/* Glass Navbar Capsule */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: isScrolled ? '0.6rem 1.5rem' : '0.8rem 0rem',
              backgroundColor: isScrolled ? 'rgba(12, 12, 15, 0.82)' : 'rgba(5, 5, 5, 0.4)',
              backdropFilter: isScrolled ? 'blur(20px) saturate(140%)' : 'blur(8px)',
              WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(140%)' : 'blur(8px)',
              border: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
              borderRadius: isScrolled ? 'var(--radius-lg)' : '0px',
              boxShadow: isScrolled ? '0 12px 35px -5px rgba(0, 0, 0, 0.7)' : 'none',
              transition: 'all 0.35s ease',
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                outline: 'none',
              }}
              aria-label="Mohsin Ahmad Home"
            >
              <KonohaLogo size={36} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  letterSpacing: '0.06em',
                  color: 'var(--text-primary)',
                  display: 'none',
                }}
                className="brand-text"
              >
                MOHSIN <span style={{ color: 'var(--color-orange-primary)' }}>AHMAD</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.25rem',
              }}
              className="desktop-nav"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={item.path === '/'}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Action Button & Mobile Menu Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a
                href={contactInfo.cvUrl}
                download="Mohsin-Ahmad-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary cv-desktop-btn"
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.8125rem',
                  border: '1px solid rgba(255, 90, 0, 0.4)',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 90, 0, 0.08)',
                }}
              >
                <span>Download CV</span>
                <Download size={14} color="var(--color-orange-primary)" />
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="mobile-toggle-btn"
                aria-label="Open navigation menu"
                style={{
                  background: 'rgba(18, 18, 22, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                }}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive CSS for Navbar */}
      <style>{`
        @media (max-width: 820px) {
          .desktop-nav {
            display: none !important;
          }
          .cv-desktop-btn {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: flex !important;
          }
        }
        @media (min-width: 640px) {
          .brand-text {
            display: inline-block !important;
          }
        }
      `}</style>

      {/* Mobile Drawer Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
