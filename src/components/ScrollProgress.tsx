import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress-indicator"
      style={{
        position: 'fixed',
        right: '1.25rem',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '3px',
        height: '140px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '999px',
        zIndex: 90,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          height: `${progress}%`,
          background: 'linear-gradient(to bottom, var(--color-orange-bright), var(--color-orange-primary))',
          boxShadow: '0 0 10px var(--color-orange-primary)',
          borderRadius: '999px',
          transition: 'height 0.1s ease-out',
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .scroll-progress-indicator {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
