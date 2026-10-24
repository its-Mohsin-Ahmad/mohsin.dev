import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer and motion is allowed
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'none',
      });

      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.28,
        ease: 'power2.out',
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Interactive element hover scale
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.card-3d-wrapper') ||
        target.closest('.nav-link') ||
        target.closest('.hud-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Inner precise dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-orange-bright)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px var(--color-orange-primary)',
          pointerEvents: 'none',
        }}
      />

      {/* Outer soft glowing follower ring */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '28px',
          height: isHovered ? '48px' : '28px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 90, 0, 0.55)',
          backgroundColor: isHovered ? 'rgba(255, 90, 0, 0.12)' : 'transparent',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease',
          boxShadow: isHovered ? '0 0 20px rgba(255, 90, 0, 0.3)' : 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
