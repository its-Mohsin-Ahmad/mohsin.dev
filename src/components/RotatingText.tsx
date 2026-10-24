import React, { useEffect, useState } from 'react';

interface RotatingTextProps {
  words?: string[];
  interval?: number;
  className?: string;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  words = ['CREATIVE WEB DEVELOPER', 'UI/UX INTERFACE DESIGNER', 'MODERN FRONTEND ARCHITECT', 'MOTION & INTERACTION SPECIALIST'],
  interval = 3000,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsFading(false);
      }, 350);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        color: 'var(--color-orange-primary)',
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'translateY(6px)' : 'translateY(0)',
        transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        minHeight: '1.4em',
      }}
    >
      {words[index]}
    </span>
  );
};
