import React from 'react';

interface KonohaLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const KonohaLogo: React.FC<KonohaLogoProps> = ({ size = 38, className = '', glow = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`konoha-logo ${className}`}
      style={{
        filter: glow ? 'drop-shadow(0 0 8px rgba(255, 90, 0, 0.6))' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease'
      }}
    >
      <defs>
        <linearGradient id="konohaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA647" />
          <stop offset="50%" stopColor="#FF5A00" />
          <stop offset="100%" stopColor="#E63F00" />
        </linearGradient>
      </defs>
      
      {/* Outer Leaf Shield Contour with anime sharp notch */}
      <path
        d="M 50,6 C 75,6 94,24 94,52 C 94,76 74,94 50,94 C 24,94 6,76 6,52 C 6,28 22,12 44,7 Z"
        fill="none"
        stroke="url(#konohaGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* Dynamic Spiral */}
      <path
        d="M 50,30 C 58,30 64,36 64,44 C 64,54 54,62 44,62 C 32,62 24,51 24,38 C 24,22 38,18 56,18 C 76,18 84,33 84,54 C 84,74 68,84 48,84 C 30,84 16,72 16,52"
        fill="none"
        stroke="url(#konohaGrad)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Top Leaf Stem / Point */}
      <path
        d="M 50,3 L 55,14 L 45,14 Z"
        fill="url(#konohaGrad)"
      />
    </svg>
  );
};
