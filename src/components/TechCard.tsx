import React, { useRef } from 'react';
import type { Skill } from '../data/skills';
import gsap from 'gsap';

interface TechCardProps {
  skill: Skill;
}

export const TechCard: React.FC<TechCardProps> = ({ skill }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 1024) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.35,
      ease: 'power1.out',
    });

    if (glareRef.current) {
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      glareRef.current.style.setProperty('--mouse-x', `${xPercent}%`);
      glareRef.current.style.setProperty('--mouse-y', `${yPercent}%`);
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'FRONTEND & LOGIC';
      case 'styling':
        return 'STYLING & LAYOUT';
      case 'backend':
        return 'BACKEND & DATA';
      default:
        return 'TECH STACK';
    }
  };

  return (
    <div style={{ perspective: '1000px', height: '100%' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-3d-wrapper glass-hud tech-skill-card"
        style={{
          borderRadius: 'var(--radius-md)',
          padding: '2rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'rgba(16, 16, 20, 0.72)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 12px 35px -8px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Subtle Glare Reflection */}
        <div ref={glareRef} className="glass-glare" />

        {/* Top Header: Tech Badge + Number */}
        <div
          className="card-3d-layer-float"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.5rem',
          }}
        >
          {/* Stylized Icon Badge */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '10px',
              backgroundColor: `${skill.iconColor}14`,
              border: `1px solid ${skill.iconColor}45`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.05rem',
              color: skill.iconColor,
              boxShadow: `0 8px 20px -4px ${skill.iconColor}30`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {skill.badge}
          </div>

          {/* Index number */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: 'var(--color-orange-primary)',
              opacity: 0.85,
            }}
          >
            {skill.number}
          </span>
        </div>

        {/* Content Layer */}
        <div className="card-3d-layer-content" style={{ marginBottom: '1.5rem' }}>
          <span
            style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--color-amber)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            {getCategoryLabel(skill.category)}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              letterSpacing: '0.01em',
            }}
          >
            {skill.name}
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {skill.description}
          </p>
        </div>

        {/* Bottom Accent Bar */}
        <div
          className="card-3d-layer-base"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '0.85rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
          }}
        >
          <span style={{ textTransform: 'uppercase' }}>CORE ARSENAL</span>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-orange-primary)',
              boxShadow: '0 0 8px var(--color-orange-primary)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
