import React, { useRef } from 'react';
import type { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

interface ProjectCardProps {
  project: Project;
  layout?: 'horizontal' | 'grid' | 'featured';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, layout = 'grid' }) => {
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

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

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

  return (
    <div
      style={{
        perspective: '1200px',
        minWidth: layout === 'horizontal' ? '380px' : 'auto',
        maxWidth: layout === 'horizontal' ? '420px' : 'none',
        flexShrink: layout === 'horizontal' ? 0 : 1,
        height: '100%',
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-3d-wrapper glass-hud project-card"
        style={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: 'rgba(15, 15, 18, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 16px 40px -10px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Soft Glare Highlight */}
        <div ref={glareRef} className="glass-glare" />

        {/* Top Media Container */}
        <div
          className="card-3d-layer-base"
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '60%',
            overflow: 'hidden',
            backgroundColor: '#0A0A0D',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease',
            }}
            className="project-thumb-img"
          />

          {/* Cinematic Dark Gradient Mask */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(14, 14, 18, 0.95) 0%, rgba(14, 14, 18, 0.25) 55%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Floating Category & Project Number Badges */}
          <div
            className="card-3d-layer-float"
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              right: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--color-orange-primary)',
                backgroundColor: 'rgba(5, 5, 5, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '0.25rem 0.65rem',
                borderRadius: '3px',
                border: '1px solid rgba(255, 90, 0, 0.35)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              }}
            >
              {project.category}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: '#FFF',
                backgroundColor: 'rgba(5, 5, 5, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '0.1rem 0.55rem',
                borderRadius: '3px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {project.number}
            </span>
          </div>
        </div>

        {/* Content Glass Panel Layer */}
        <div
          className="card-3d-layer-content"
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            gap: '1.25rem',
            background: 'linear-gradient(180deg, rgba(20, 20, 25, 0.4) 0%, rgba(15, 15, 18, 0.8) 100%)',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: 'var(--text-primary)',
                marginBottom: '0.35rem',
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {project.tags.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link with 3D Arrow Accent */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1rem' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-action"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-orange-primary)',
                textDecoration: 'none',
                transition: 'gap 0.25s ease, color 0.25s ease',
              }}
            >
              <span>VIEW PROJECT</span>
              <ArrowUpRight size={16} className="project-arrow-icon" style={{ transition: 'transform 0.25s ease' }} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .project-card:hover .project-thumb-img {
          transform: scale(1.06);
        }
        .project-card:hover .project-link-action {
          color: #FFF;
        }
        .project-card:hover .project-arrow-icon {
          transform: translate(3px, -3px);
          color: var(--color-orange-bright);
        }
      `}</style>
    </div>
  );
};
