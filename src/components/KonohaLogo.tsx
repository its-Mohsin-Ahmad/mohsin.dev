import React from 'react';

interface KonohaLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const KonohaLogo: React.FC<KonohaLogoProps> = ({ size = 38, className = '', glow = true }) => {
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/logo/logo.png`}
      alt="Mohsin Ahmad Logo"
      className={`konoha-logo ${className}`}
      style={{
        width: size,
        height: size,
        filter: glow ? 'drop-shadow(0 0 8px rgba(255, 90, 0, 0.6))' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
        objectFit: 'contain',
      }}
    />
  );
};