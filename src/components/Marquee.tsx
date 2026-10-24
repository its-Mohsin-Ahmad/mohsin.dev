import React from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: number; // seconds per cycle
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items = ['DESIGN', 'DEVELOP', 'CREATE', 'EXPLORE', 'INNOVATE', 'ANIMATE'],
  speed = 22,
  className = '',
}) => {
  return (
    <div
      className={`marquee-strip ${className}`}
      style={{
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        padding: '1.25rem 0',
        backgroundColor: 'rgba(11, 11, 13, 0.75)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        userSelect: 'none',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          animation: `marqueeLoop ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {/* Render twice for seamless continuous loop */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              letterSpacing: '0.08em',
              color: idx % 2 === 0 ? 'var(--text-primary)' : 'var(--color-orange-primary)',
              opacity: 0.85,
            }}
          >
            <span>{item}</span>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-orange-primary)',
                boxShadow: '0 0 10px var(--color-orange-primary)',
                opacity: 0.75,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
