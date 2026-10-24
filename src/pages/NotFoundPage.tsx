import React from 'react';
import { Link } from 'react-router-dom';
import { KonohaLogo } from '../components/KonohaLogo';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: '560px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <KonohaLogo size={64} glow={true} />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'var(--color-orange-primary)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.5rem',
          }}
        >
          // ERROR 404
        </span>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            lineHeight: 1,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}
        >
          LOST IN THE <span style={{ color: 'var(--color-orange-primary)' }}>SHADOWS</span>
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            marginBottom: '2rem',
          }}
        >
          The page you are looking for has vanished into thin air or never existed. Return back to base.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/" className="btn-primary">
            <Home size={16} />
            <span>BACK TO HOME</span>
          </Link>
          <Link to="/projects" className="btn-secondary">
            <span>EXPLORE PROJECTS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
