import React, { useEffect, useRef, useState } from 'react';
import { KonohaLogo } from './KonohaLogo';
import gsap from 'gsap';

export const InitialLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Check if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete();
          },
        });
      },
    });

    // Animate progress number
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercent(Math.floor(counter.val));
      },
    }, 0);

    // Animate bar width
    tl.to(
      progressBarRef.current,
      {
        width: '100%',
        duration: 1.1,
        ease: 'power2.inOut',
      },
      0
    );

    // Subtle scale of logo
    tl.fromTo(
      logoRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      0.1
    );

    // Text reveal
    tl.fromTo(
      textRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      0.2
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
      }}
    >
      <div
        ref={logoRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.75rem',
        }}
      >
        <KonohaLogo size={70} glow={true} />
      </div>

      <div
        ref={textRef}
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '0.08em',
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1,
          }}
        >
          MOHSIN <span style={{ color: 'var(--color-orange-primary)' }}>AHMAD</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.8125rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginTop: '0.5rem',
          }}
        >
          // CREATIVE DEVELOPER & DESIGNER
        </p>
      </div>

      {/* Progress container */}
      <div
        style={{
          width: '240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#1E1E24',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, var(--color-orange-primary), var(--color-orange-bright))',
              boxShadow: '0 0 10px var(--color-orange-primary)',
            }}
          />
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}
        >
          <span>INITIALIZING</span>
          <span style={{ color: 'var(--color-orange-primary)', fontWeight: 600 }}>{percent}%</span>
        </div>
      </div>
    </div>
  );
};
