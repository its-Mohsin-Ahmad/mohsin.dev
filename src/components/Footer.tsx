import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { KonohaLogo } from './KonohaLogo';
import { GithubIcon } from './GithubIcon';
import { LinkedInIcon, FacebookIcon } from './SocialIcons';
import { navItems, contactInfo } from '../data/navigation';
import { useLenis } from '../context/LenisContext';
import { ArrowUp, MessageCircle, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { scrollTo } = useLenis();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    scrollTo(0, { duration: 1.2 });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid rgba(255, 90, 0, 0.25)',
        position: 'relative',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <KonohaLogo size={65} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                }}
              >
                MOHSIN AHMAD
              </span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '340px', lineHeight: 1.6 }}>
              {contactInfo.role} at {contactInfo.institution}.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 10px #10B981',
                }}
              />
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>
                CGPA: {contactInfo.cgpa} • Available for Opportunities
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-orange-primary)',
                marginBottom: '1.25rem',
              }}
            >
              // NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Social & Direct Channels */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-orange-primary)',
                marginBottom: '1.25rem',
              }}
            >
              // VERIFIED CHANNELS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <a
                href={contactInfo.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <MessageCircle size={18} color="var(--color-orange-primary)" />
                <span>WhatsApp: {contactInfo.whatsapp.intl}</span>
              </a>

              <a
                href={contactInfo.email.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Mail size={18} color="var(--color-orange-primary)" />
                <span>{contactInfo.email.address}</span>
              </a>

              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <LinkedInIcon size={18} color="var(--color-orange-primary)" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <GithubIcon size={18} color="var(--color-orange-primary)" />
                <span>GitHub: mohsinahmad0347-maker</span>
              </a>

              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <FacebookIcon size={18} color="var(--color-orange-primary)" />
                <span>Facebook Profile</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '2rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>© {currentYear} Mohsin Ahmad. Software Engineering Student @ Islamia College Peshawar.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Crafted with</span>
            <Heart size={14} color="var(--color-orange-primary)" fill="var(--color-orange-primary)" />
            <span>GSAP, Lenis & Anime Spirit</span>
          </p>
        </div>
      </div>

      {/* Floating Back-To-Top button */}
      <button
        onClick={handleBackToTop}
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'rgba(17, 17, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-hover)',
          color: 'var(--color-orange-primary)',
          boxShadow: '0 8px 24px -4px var(--color-orange-glow)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 90,
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: showBackToTop ? 'all' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-orange-primary)';
          e.currentTarget.style.color = '#050505';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(17, 17, 20, 0.85)';
          e.currentTarget.style.color = 'var(--color-orange-primary)';
        }}
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};
