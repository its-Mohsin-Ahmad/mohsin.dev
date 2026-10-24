import React, { useEffect, useRef } from 'react';
import { skillsData } from '../data/skills';
import { TechCard } from '../components/TechCard';
import { TextScramble } from '../components/TextScramble';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SkillsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        '.skills-hero-elem',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
      );

      // Tech Cards staggered entrance with subtle 3D rotation
      gsap.fromTo(
        '.skills-grid-item',
        { opacity: 0, y: 45, rotateX: 8, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-grid-container',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =========================================================================
          SECTION 9.1 — SKILLS HERO
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'calc(var(--header-height) + 3rem)',
          paddingBottom: '3.5rem',
          position: 'relative',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2.5rem',
            }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: '640px' }}>
              <TextScramble
                text="// MY SKILLS"
                style={{
                  color: 'var(--color-orange-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              />

              <h1
                className="skills-hero-elem font-display"
                style={{
                  fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.02em',
                  margin: '0.25rem 0',
                }}
              >
                SKILLS
              </h1>

              <div className="skills-hero-elem">
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: 'var(--color-orange-bright)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  TOOLS I USE TO TURN IDEAS INTO BEAUTIFUL DIGITAL EXPERIENCES.
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  I work with modern technologies to build fast, responsive, and scalable web applications. Here are the 8 core tools and technologies I use to bring ideas to life.
                </p>
              </div>
            </div>

            {/* Right Character Art */}
            <div
              style={{
                position: 'relative',
                width: '320px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="skills-bust-wrap"
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.75rem',
                  color: 'var(--color-orange-primary)',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                BETTER TOOLS // BIGGER DREAMS
              </div>
              <img
                src="/assets/anime/character-bust.png"
                alt="Mohsin Ahmad skills artwork"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 30px rgba(255, 90, 0, 0.45))',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9.2 & 9.3 — SKILL GRID (8 3D GLASS TECHNOLOGIES)
          ========================================================================= */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
        }}
      >
        <div className="container">
          <div
            className="skills-grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {skillsData.map((skill) => (
              <div key={skill.id} className="skills-grid-item">
                <TechCard skill={skill} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9.5 — ALWAYS LEARNING (GLASS HUD)
          ========================================================================= */}
      <section className="section-spacing" style={{ position: 'relative' }}>
        <div className="container">
          <div
            className="glass-hud"
            style={{
              padding: '3rem 2.5rem',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: 'var(--color-orange-primary)',
                  }}
                >
                  08
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                  }}
                >
                  ALWAYS LEARNING
                </h3>
              </div>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                New tools. Better solutions. A never-ending journey. Technology evolves rapidly, and I continuously refine my skills to build at the absolute highest standard.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/projects" className="btn-primary">
                <span>VIEW IMPLEMENTATIONS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .skills-bust-wrap {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
