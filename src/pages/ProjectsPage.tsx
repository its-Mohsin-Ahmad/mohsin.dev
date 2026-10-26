import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { TextScramble } from '../components/TextScramble';
import { ArrowRight, Compass, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Desktop Horizontal Scroll Pinning (>= 1025px)
    mm.add('(min-width: 1025px)', () => {
      if (!gallerySectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const getScrollDistance = () => track.scrollWidth - window.innerWidth + 120;

      const trigger = ScrollTrigger.create({
        trigger: gallerySectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1.1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          // Calculate project index (1 to 7) based on scroll progress
          const index = Math.min(projectsData.length, Math.max(1, Math.round(self.progress * (projectsData.length - 1)) + 1));
          setCurrentIndex(index);

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.max(10, self.progress * 100)}%`;
          }
        },
        animation: gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
        }),
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={pageRef} style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* =========================================================================
          SECTION 8.1 — PROJECTS HERO
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'calc(var(--header-height) + 3rem)',
          paddingBottom: '3rem',
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
              gap: '2rem',
            }}
          >
            {/* Heading & Subtitle */}
            <div style={{ maxWidth: '640px' }}>
              <TextScramble
                text="// SELECTED WORK / 2026"
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
                className="font-display"
                style={{
                  fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.02em',
                  margin: '0.25rem 0',
                }}
              >
                MY <span style={{ color: 'var(--color-orange-primary)' }}>PROJECTS</span>
              </h1>

              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.75rem',
                  lineHeight: 1.6,
                }}
              >
                A collection of ideas turned into real digital experiences. Explore the seven verified web applications and interfaces below.
              </p>

              {/* Scroll Instruction with Live Project Counter */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  marginTop: '1.5rem',
                }}
              >
                <div
                  className="glass-panel"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.45rem 1rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: 'var(--color-orange-primary)',
                    textTransform: 'uppercase',
                  }}
                >
                  <Compass size={16} />
                  <span>SCROLL DOWN TO EXPLORE GALLERY</span>
                </div>

                <div
                  className="glass-panel project-index-badge"
                  style={{
                    padding: '0.45rem 1rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: '#FFF',
                  }}
                >
                  PROJECT <span style={{ color: 'var(--color-orange-primary)' }}>0{currentIndex}</span> / 07
                </div>
              </div>
            </div>

            {/* Top Right Anime Character Bust */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                padding: '1rem',
              }}
              className="projects-bust-wrap"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/anime/projects.png`}
                alt="Mohsin Ahmad artwork"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 40px rgba(255, 90, 0, 0.5))',
                  borderRadius: '24px',
                  transform: 'rotate(-3deg)',
                  transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  ':hover': {
                    transform: 'rotate(0deg) scale(1.03)',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8.4 — HORIZONTAL PINNED GALLERY (DESKTOP) & GRID (MOBILE)
          ========================================================================= */}
      <section
        ref={gallerySectionRef}
        className="projects-gallery-section"
        style={{
          position: 'relative',
          paddingTop: '2.5rem',
          paddingBottom: '3.5rem',
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Track Container */}
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            ref={trackRef}
            className="projects-track"
            style={{
              display: 'flex',
              gap: '2.5rem',
              paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
              paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
              willChange: 'transform',
            }}
          >
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} layout="horizontal" />
            ))}
          </div>
        </div>

        {/* Desktop Progress Bar & Instruction Bar */}
        <div
          className="gallery-progress-bar-container"
          style={{
            marginTop: '3rem',
            paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
            paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>PROJECT SHOWCASE</span>
              <span style={{ color: 'var(--color-orange-primary)', fontWeight: 700 }}>
                [0{currentIndex} / 07]
              </span>
            </span>
            <span style={{ color: 'var(--color-orange-primary)', fontWeight: 600 }}>
              {Math.round(scrollProgress * 100)}%
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>DRAG / SCROLL TO EXPLORE</span>
              <ChevronRight size={14} color="var(--color-orange-primary)" />
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
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
                width: '14%',
                background: 'linear-gradient(90deg, var(--color-orange-primary), var(--color-orange-bright))',
                boxShadow: '0 0 12px var(--color-orange-primary)',
                borderRadius: '999px',
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8.7 — END OF GALLERY CTA
          ========================================================================= */}
      <section className="section-spacing" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-panel" style={{ padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
            <span
              style={{
                color: 'var(--color-orange-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              // WHAT'S NEXT
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1,
                letterSpacing: '0.03em',
                marginBottom: '1.25rem',
              }}
            >
              LIKE WHAT YOU SEE? <span style={{ color: 'var(--color-orange-primary)' }}>LET'S TALK.</span>
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              Every project starts with a conversation. Let's discuss how we can turn your digital project into a polished reality.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                <span>GET IN TOUCH</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/skills" className="btn-secondary">
                <span>EXPLORE MY SKILLS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Styles for Mobile Fallback */}
      <style>{`
        @media (max-width: 1024px) {
          .projects-gallery-section {
            padding: 2rem 0 !important;
          }
          .projects-track {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
            width: 100% !important;
            padding: 0 1.25rem !important;
            gap: 2rem !important;
          }
          .gallery-progress-bar-container {
            display: none !important;
          }
          .projects-bust-wrap {
            display: none !important;
          }
          .project-index-badge {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
