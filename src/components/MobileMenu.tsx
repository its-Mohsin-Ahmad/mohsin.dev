import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems, contactInfo } from '../data/navigation';
import { X, Download, MessageCircle, Mail } from 'lucide-react';
import gsap from 'gsap';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (linksRef.current) {
        const items = linksRef.current.querySelectorAll('.mobile-nav-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out', delay: 0.1 }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="mobile-menu-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 5, 0.96)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
      }}
    >
      {/* Top Bar with Close Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--color-orange-primary)', fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            // NAVIGATION
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            borderRadius: '4px',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s',
          }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Main Links */}
      <div
        ref={linksRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          margin: 'auto 0',
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="mobile-nav-item"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              letterSpacing: '0.04em',
              color: isActive ? 'var(--color-orange-primary)' : 'var(--text-primary)',
              transition: 'color 0.2s, transform 0.2s',
            })}
          >
            <span style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--color-orange-primary)', opacity: 0.7 }}>
              {item.number}
            </span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-default)', paddingTop: '1.25rem' }}>
        <a
          href={contactInfo.cvUrl}
          download="Mohsin-Ahmad-CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Download size={16} />
          <span>DOWNLOAD CV</span>
        </a>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', color: 'var(--text-secondary)' }}>
          <a
            href={contactInfo.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', textDecoration: 'none' }}
          >
            <MessageCircle size={16} color="var(--color-orange-primary)" />
            <span>WhatsApp</span>
          </a>
          <a
            href={contactInfo.email.url}
            style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', textDecoration: 'none' }}
          >
            <Mail size={16} color="var(--color-orange-primary)" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};
