import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { contactInfo } from '../data/navigation';
import { ProjectCard } from '../components/ProjectCard';
import { TechCard } from '../components/TechCard';
import { GithubIcon } from '../components/GithubIcon';
import { LinkedInIcon } from '../components/SocialIcons';
import { BackgroundParticles } from '../components/BackgroundParticles';
import { TextScramble } from '../components/TextScramble';
import { RotatingText } from '../components/RotatingText';
import { Marquee } from '../components/Marquee';
import { ArrowRight, MessageCircle, Mail, ChevronDown, Code, Zap, Layers, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse Parallax for Anime Character on Desktop
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || !characterRef.current || window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 22;
      const yPercent = (clientY / window.innerHeight - 0.5) * 16;

      gsap.to(characterRef.current, {
        x: xPercent,
        y: yPercent,
        duration: 0.8,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Hero Entrance Timeline with Masked Text Reveals
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          '.hero-badge',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }
        )
          .fromTo(
            '.hero-label-wrap',
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.5 },
            '-=0.2'
          )
          .fromTo(
            '.hero-title-mask',
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power4.out' },
            '-=0.2'
          )
          .fromTo(
            '.hero-desc',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.4'
          )
          .fromTo(
            '.hero-cta-group',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.4'
          )
          .fromTo(
            characterRef.current,
            { opacity: 0, scale: 0.92, y: 25 },
            { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
            0.2
          );

        // Character scroll parallax
        if (characterRef.current) {
          gsap.to(characterRef.current, {
            y: 80,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        // ScrollTrigger reveal for Introduction section
        if (introRef.current) {
          gsap.fromTo(
            introRef.current.querySelectorAll('.reveal-on-scroll'),
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: introRef.current,
                start: 'top 80%',
              },
            }
          );
        }

        // ScrollTrigger reveal for Featured Projects
        if (featuredRef.current) {
          gsap.fromTo(
            featuredRef.current.querySelectorAll('.featured-card-wrap'),
            { opacity: 0, y: 45, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: featuredRef.current,
                start: 'top 75%',
              },
            }
          );
        }
      }
    }, heroRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);
  const previewSkills = skillsData.slice(0, 4);

  return (
    <div ref={heroRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =========================================================================
          SECTION 6.1 — CINEMATIC HERO WITH GLASSMORPHISM & PARTICLES
          ========================================================================= */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 'calc(var(--header-height) + 2rem)',
          paddingBottom: '4rem',
        }}
      >
        {/* Atmospheric Floating Embers / Sparks */}
        <BackgroundParticles />

        {/* Ambient Radial Lighting */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 90, 0, 0.18) 0%, rgba(255, 90, 0, 0.02) 60%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'blur(60px)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="hero-grid"
          >
            {/* Left Column — Content & Giant Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Status Badge */}
              <div
                className="hero-badge"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.4rem 0.95rem',
                  backgroundColor: 'rgba(17, 17, 20, 0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '999px',
                  width: 'fit-content',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 10px #10B981',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                  }}
                >
                  CURRENTLY AVAILABLE FOR WORK
                </span>
              </div>

              {/* Text Scramble Introductory Label */}
              <div className="hero-label-wrap">
                <TextScramble
                  text="// CREATIVE DEVELOPER & DESIGNER"
                  style={{
                    color: 'var(--color-orange-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                />
              </div>

              {/* Main Heading: Oversized Masked MOHSIN AHMAD */}
              <h1
                style={{
                  margin: '0.25rem 0',
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                <span className="text-mask-wrapper">
                  <span
                    className="hero-title-mask font-display"
                    style={{
                      display: 'block',
                      fontSize: 'clamp(4.2rem, 9.8vw, 9.8rem)',
                      color: 'var(--color-orange-primary)',
                      letterSpacing: '0.02em',
                      textShadow: '0 0 45px rgba(255, 90, 0, 0.45)',
                    }}
                  >
                    MOHSIN
                  </span>
                </span>
                <span className="text-mask-wrapper">
                  <span
                    className="hero-title-mask font-display"
                    style={{
                      display: 'block',
                      fontSize: 'clamp(4.2rem, 9.8vw, 9.8rem)',
                      color: 'var(--text-primary)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    AHMAD
                  </span>
                </span>
              </h1>

              {/* Dynamic Rotating Role Badge */}
              <div style={{ marginTop: '-0.25rem' }}>
                <RotatingText />
              </div>

              {/* Supporting Description */}
              <p
                className="hero-desc"
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                  color: 'var(--text-secondary)',
                  maxWidth: '540px',
                  lineHeight: 1.6,
                }}
              >
                I build modern, responsive, and interactive web experiences with thoughtful design and smooth motion.
              </p>

              {/* CTA Buttons */}
              <div
                className="hero-cta-group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <Link to="/projects" className="btn-primary">
                  <span>EXPLORE MY WORK</span>
                  <ArrowRight size={16} />
                </Link>

                <Link to="/contact" className="btn-secondary">
                  <span>CONTACT ME</span>
                </Link>

                <a
                  href={contactInfo.cvUrl}
                  download="Mohsin-Ahmad-CV.pdf"
                  className="btn-secondary"
                  style={{
                    backgroundColor: 'rgba(255, 90, 0, 0.08)',
                    borderColor: 'rgba(255, 90, 0, 0.4)',
                  }}
                >
                  <Download size={15} color="var(--color-orange-primary)" />
                  <span>DOWNLOAD CV</span>
                </a>
              </div>

              {/* Verified Social Links */}
              <div
                className="hero-badge"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  marginTop: '1rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  CONNECT:
                </span>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.8125rem' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <LinkedInIcon size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.8125rem' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={contactInfo.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', fontSize: '0.8125rem' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-orange-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column — Anime Character Artwork & Japanese Accent */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="hero-character-col"
            >
              {/* Japanese Vertical Text Accent */}
              <div
                className="japanese-vertical"
                style={{
                  position: 'absolute',
                  right: '-1.5rem',
                  top: '10%',
                  zIndex: 3,
                  fontSize: '1rem',
                }}
              >
                うずまきナルト // NEVER GIVE UP
              </div>

              {/* Character Image with Parallax & Soft Glowing Edges */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '850px',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '0 auto',
                  padding: '1rem',
                }}
              >
                <img
                  ref={characterRef}
                  src={`${import.meta.env.BASE_URL}assets/anime/home.png`}
                  alt="Mohsin Ahmad anime character representation"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 45px rgba(255, 90, 0, 0.5))',
                    willChange: 'transform',
                    borderRadius: '24px',
                    transform: 'rotate(-2deg)',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            zIndex: 10,
          }}
          onClick={() => {
            const nextSec = document.getElementById('intro-section');
            nextSec?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>SCROLL DOWN</span>
          <ChevronDown size={16} color="var(--color-orange-primary)" className="bounce-arrow" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6.2 — INTRODUCTION (MORE THAN JUST CODE)
          ========================================================================= */}
      <section
        id="intro-section"
        ref={introRef}
        className="section-spacing"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-default)',
          borderBottom: '1px solid var(--border-default)',
          position: 'relative',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
              gap: '3.5rem',
              alignItems: 'center',
            }}
            className="intro-grid"
          >
            {/* Left: Text Explanation */}
            <div>
              <span
                className="reveal-on-scroll"
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
                // PHILOSOPHY & VISION
              </span>

              <h2
                className="reveal-on-scroll font-display"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1,
                  letterSpacing: '0.03em',
                  marginBottom: '1.5rem',
                }}
              >
                MORE THAN <span style={{ color: 'var(--color-orange-primary)' }}>JUST CODE.</span>
              </h2>

              <p
                className="reveal-on-scroll"
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}
              >
                To me, building websites isn't just about syntax and stylesheets—it's about orchestrating an interactive story. I combine visual aesthetics with robust architecture, creating digital experiences that are lightning-fast, responsive across every screen, and memorable.
              </p>

              <p
                className="reveal-on-scroll"
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                }}
              >
                Whether it's modern component architecture with React, dynamic styling with Tailwind, seamless backend integration, or high-performance GSAP motion design, I obsess over the details that transform ordinary ideas into extraordinary digital reality.
              </p>

              <div className="reveal-on-scroll" style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/about" className="btn-secondary">
                  <span>DISCOVER MY JOURNEY</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Glass 3D HUD Feature Blocks */}
            <div
              className="reveal-on-scroll"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div className="glass-hud" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 90, 0, 0.12)', color: 'var(--color-orange-primary)' }}>
                    <Code size={22} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Clean Architecture</h4>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Scalable, reusable frontend code crafted with modern standards and maintainability.
                </p>
              </div>

              <div className="glass-hud" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 90, 0, 0.12)', color: 'var(--color-orange-primary)' }}>
                    <Zap size={22} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Performance & Motion</h4>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Silky 60fps animations with GSAP and Lenis, engineered without bogging down devices.
                </p>
              </div>

              <div className="glass-hud" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '6px', backgroundColor: 'rgba(255, 90, 0, 0.12)', color: 'var(--color-orange-primary)' }}>
                    <Layers size={22} />
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>Cross-Platform Fidelity</h4>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Responsive layouts tested thoroughly from 320px ultra-compact mobile up to 4K displays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SCROLLING MARQUEE STRIP
          ========================================================================= */}
      <Marquee items={['DESIGN', 'DEVELOP', 'CREATE', 'EXPLORE', 'INNOVATE', 'ANIMATE']} speed={24} />

      {/* =========================================================================
          SECTION 6.3 — FEATURED PROJECTS (WITH 3D TILT CARDS)
          ========================================================================= */}
      <section ref={featuredRef} className="section-spacing">
        <div className="container">
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <div>
              <span
                style={{
                  color: 'var(--color-orange-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                // PORTFOLIO HIGHLIGHTS
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1,
                  letterSpacing: '0.03em',
                }}
              >
                SELECTED <span style={{ color: 'var(--color-orange-primary)' }}>WORK</span>
              </h2>
            </div>

            <Link to="/projects" className="btn-secondary">
              <span>VIEW ALL PROJECTS</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Featured Cards Grid with 3D Tilt */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.25rem',
            }}
          >
            {featuredProjects.map((project) => (
              <div key={project.id} className="featured-card-wrap">
                <ProjectCard project={project} layout="grid" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6.4 — TECHNOLOGY PREVIEW
          ========================================================================= */}
      <section
        className="section-spacing"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-default)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <div>
              <span
                style={{
                  color: 'var(--color-orange-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                // CORE STACK
              </span>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 1,
                  letterSpacing: '0.03em',
                }}
              >
                TOOLS OF <span style={{ color: 'var(--color-orange-primary)' }}>MY TRADE</span>
              </h2>
            </div>

            <Link to="/skills" className="btn-secondary">
              <span>EXPLORE ALL SKILLS</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {previewSkills.map((skill) => (
              <TechCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6.5 — CONTACT CTA
          ========================================================================= */}
      <section
        className="section-spacing"
        style={{
          position: 'relative',
          borderTop: '1px solid var(--border-default)',
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, #0E0E14 100%)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '850px' }}>
          <div
            className="glass-panel"
            style={{
              padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <span
              style={{
                color: 'var(--color-orange-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              // READY FOR COLLABORATION
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1,
                letterSpacing: '0.03em',
                marginBottom: '1.25rem',
              }}
            >
              HAVE AN IDEA? <span style={{ color: 'var(--color-orange-primary)' }}>LET'S BUILD IT.</span>
            </h2>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
              }}
            >
              Whether you need a cutting-edge web application, an interactive showcase, or a sleek responsive overhaul, I'm ready to bring your vision to life.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
              }}
            >
              <a
                href={contactInfo.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={18} />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <a
                href={contactInfo.email.url}
                className="btn-secondary"
              >
                <Mail size={18} color="var(--color-orange-primary)" />
                <span>SEND AN EMAIL</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive layout styles */}
      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .bounce-arrow {
          animation: bounceDown 1.8s infinite ease-in-out;
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: left;
          }
          .hero-character-col {
            order: -1;
            max-width: 420px;
            margin: 0 auto;
          }
          .intro-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
