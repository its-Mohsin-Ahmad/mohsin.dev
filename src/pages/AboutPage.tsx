import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { contactInfo } from '../data/navigation';
import { TextScramble } from '../components/TextScramble';
import { Code, Layout, Sparkles, ArrowRight, Download, GraduationCap, Award, Globe2, BrainCircuit, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo(
        '.about-hero-elem',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }
      );

      // Character scroll parallax
      if (characterRef.current) {
        gsap.to(characterRef.current, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero-grid',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // What I Do Glass Cards 3D entrance
      gsap.fromTo(
        '.what-i-do-card',
        { opacity: 0, y: 40, rotateX: 6 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.what-i-do-grid',
            start: 'top 80%',
          },
        }
      );

      // Progressive Vertical Timeline Line Drawing
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.process-vertical-timeline',
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }

      // Timeline Steps activation
      const steps = document.querySelectorAll('.timeline-step-node');
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 82%',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =========================================================================
          SECTION 7.1 & 7.2 — ABOUT HERO & AUTHENTIC CV BIO
          ========================================================================= */}
      <section
        style={{
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingTop: 'calc(var(--header-height) + 2rem)',
          paddingBottom: '4rem',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
              gap: '3rem',
              alignItems: 'center',
            }}
            className="about-hero-grid"
          >
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="about-hero-elem">
                <TextScramble
                  text="// ABOUT ME"
                  style={{
                    color: 'var(--color-orange-primary)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                />
              </div>

              <h1
                className="about-hero-elem font-display"
                style={{
                  fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.02em',
                  margin: 0,
                }}
              >
                MOHSIN <span style={{ color: 'var(--color-orange-primary)' }}>AHMAD</span>
              </h1>

              <div className="about-hero-elem">
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'var(--color-amber)',
                    textTransform: 'uppercase',
                  }}
                >
                  SOFTWARE ENGINEERING STUDENT • FRONTEND WEB DEVELOPER
                </span>
              </div>

              {/* Exact bio from Mohsin's uploaded CV */}
              <p
                className="about-hero-elem"
                style={{
                  fontSize: '1.025rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '560px',
                }}
              >
                Motivated Software Engineering student at <strong style={{ color: '#FFF' }}>Islamia College Peshawar</strong> with a strong academic record (<strong style={{ color: 'var(--color-orange-bright)' }}>CGPA 3.95 / 4.00</strong>) and an active focus on frontend web development, software engineering, and business intelligence.
              </p>

              <p
                className="about-hero-elem"
                style={{
                  fontSize: '0.925rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                }}
              >
                Skilled in HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, React, Microsoft Excel, and Power BI. Dedicated to building responsive, user-friendly web interfaces and interactive data dashboards, eager to apply technical knowledge, creativity, and problem-solving abilities to practical, high-impact projects.
              </p>

              {/* Action Buttons */}
              <div
                className="about-hero-elem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <Link to="/contact" className="btn-primary">
                  <span>GET IN TOUCH</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href={contactInfo.cvUrl}
                  download="Mohsin-Ahmad-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Download size={16} />
                  <span>DOWNLOAD VERIFIED CV</span>
                </a>
              </div>

              {/* Verified Education & Academic Excellence Badges */}
              <div
                className="about-hero-elem"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '1rem',
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', color: 'var(--color-orange-primary)' }}>3.95</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CGPA / 4.00</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', color: 'var(--color-orange-primary)' }}>BS SE</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Islamia College</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', color: 'var(--color-orange-primary)' }}>8 Mo+</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Frontend Dev</div>
                </div>
              </div>
            </div>

            {/* Right Character Art */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="about-character-col"
            >
              <div
                className="japanese-vertical"
                style={{
                  position: 'absolute',
                  right: '-1.5rem',
                  top: '15%',
                  zIndex: 2,
                }}
              >
                うずまきナルト // DREAM CODE ACHIEVE
              </div>

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
                  src={`${import.meta.env.BASE_URL}assets/anime/about.png`}
                  alt="Mohsin Ahmad illustration"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 45px rgba(255, 90, 0, 0.5))',
                    willChange: 'transform',
                    borderRadius: '24px',
                    transform: 'rotate(2deg)',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    ':hover': {
                      transform: 'rotate(0deg) scale(1.03)',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: AUTHENTIC CV CREDENTIALS, WORK EXPERIENCE & SKILLS
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
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
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
              // CURRICULUM VITAE OVERVIEW
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                lineHeight: 1,
                letterSpacing: '0.03em',
              }}
            >
              EXPERIENCE & <span style={{ color: 'var(--color-orange-primary)' }}>QUALIFICATIONS</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem',
            }}
          >
            {/* Card 1: Education & Languages */}
            <div className="glass-hud" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 90, 0, 0.12)',
                      border: '1px solid rgba(255, 90, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-orange-primary)',
                    }}
                  >
                    <GraduationCap size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      ACADEMIC BACKGROUND
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Education</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.15rem', color: '#FFF' }}>
                    Bachelor of Science in Software Engineering
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-orange-primary)', fontWeight: 600 }}>
                    <Award size={16} />
                    <span>Islamia College Peshawar</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <span>Session: 2025 – 2029 (3rd Semester)</span>
                    <span style={{ color: '#10B981', fontWeight: 700 }}>CGPA: 3.95 / 4.00</span>
                  </div>
                </div>
              </div>

              {/* Spoken Languages */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <Globe2 size={14} color="var(--color-orange-primary)" />
                  <span>Spoken Languages</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {contactInfo.languages.map((lang) => (
                    <span key={lang} className="tech-tag" style={{ color: 'var(--text-primary)' }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Work Experience (From CV) */}
            <div className="glass-hud" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 90, 0, 0.12)',
                      border: '1px solid rgba(255, 90, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-orange-primary)',
                    }}
                  >
                    <Briefcase size={26} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      PRACTICAL TRACK RECORD
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Work Experience</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ padding: '0.9rem', backgroundColor: 'rgba(5, 5, 5, 0.5)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#FFF', fontWeight: 600, fontSize: '0.95rem' }}>MS Excel & Business Intelligence</span>
                      <span style={{ color: 'var(--color-orange-primary)', fontSize: '0.8rem', fontWeight: 700 }}>1 Year</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', margin: 0, lineHeight: 1.5 }}>
                      Data modeling, analysis formulas, Microsoft Power BI integration, and dynamic dashboard reporting.
                    </p>
                  </div>

                  <div style={{ padding: '0.9rem', backgroundColor: 'rgba(5, 5, 5, 0.5)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ color: '#FFF', fontWeight: 600, fontSize: '0.95rem' }}>Frontend Web Development</span>
                      <span style={{ color: 'var(--color-orange-primary)', fontSize: '0.8rem', fontWeight: 700 }}>8 Months</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem', margin: 0, lineHeight: 1.5 }}>
                      HTML5, CSS3, JavaScript, Tailwind CSS, Bootstrap, and React component-driven architectures.
                    </p>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', margin: 0 }}>
                {contactInfo.experience.summary}
              </p>
            </div>

            {/* Card 3: Soft Skills & Working Methodologies */}
            <div className="glass-hud" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 90, 0, 0.12)',
                    border: '1px solid rgba(255, 90, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-orange-primary)',
                  }}
                >
                  <BrainCircuit size={26} />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    PROFESSIONAL ATTRIBUTES
                  </span>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Soft Skills</h3>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {contactInfo.softSkills.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      padding: '0.65rem 0.85rem',
                      backgroundColor: 'rgba(5, 5, 5, 0.6)',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-orange-primary)' }} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dedicated CV Document Spotlight Banner */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 2.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.75rem',
              border: '1px solid rgba(255, 90, 0, 0.35)',
              boxShadow: '0 10px 30px -5px rgba(255, 90, 0, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 90, 0, 0.15)',
                  border: '1px solid rgba(255, 90, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-orange-primary)',
                }}
              >
                <FileText size={28} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                  <h4 style={{ fontSize: '1.2rem', color: '#FFF', margin: 0 }}>
                    Mohsin Ahmad — Official Curriculum Vitae
                  </h4>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#10B981', fontWeight: 600, backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '0.15rem 0.55rem', borderRadius: '999px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <CheckCircle2 size={12} />
                    VERIFIED PDF
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                  Software Engineering Student @ Islamia College Peshawar • CGPA 3.95/4.00 • 2.5 MB PDF
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={contactInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <span>VIEW ONLINE</span>
              </a>
              <a
                href={contactInfo.cvUrl}
                download="Mohsin-Ahmad-CV.pdf"
                className="btn-primary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                <Download size={16} />
                <span>DOWNLOAD CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.3 — WHAT I DO (3D GLASS PANELS)
          ========================================================================= */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
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
              // CORE DISCIPLINES
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1,
                letterSpacing: '0.03em',
              }}
            >
              WHAT <span style={{ color: 'var(--color-orange-primary)' }}>I DO</span>
            </h2>
          </div>

          <div
            className="what-i-do-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.25rem',
            }}
          >
            {/* Feature 1: Web Development */}
            <div className="glass-hud what-i-do-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 90, 0, 0.12)',
                  border: '1px solid rgba(255, 90, 0, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-orange-primary)',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 20px -4px rgba(255, 90, 0, 0.3)',
                }}
              >
                <Code size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Web Development
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Building high-performance, responsive websites and web applications. Implementing reusable modular components with React, writing robust logic in modern JavaScript/TypeScript, and connecting backend architectures.
              </p>
            </div>

            {/* Feature 2: Interface Design */}
            <div className="glass-hud what-i-do-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 90, 0, 0.12)',
                  border: '1px solid rgba(255, 90, 0, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-orange-primary)',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 20px -4px rgba(255, 90, 0, 0.3)',
                }}
              >
                <Layout size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Interface Design
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Crafting clean layouts, refined typography, and purposeful spacing. Designing dark-mode oriented, futuristic aesthetic interfaces with intuitive user journeys and accessibility in mind.
              </p>
            </div>

            {/* Feature 3: Motion & Interaction */}
            <div className="glass-hud what-i-do-card" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 90, 0, 0.12)',
                  border: '1px solid rgba(255, 90, 0, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-orange-primary)',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 20px -4px rgba(255, 90, 0, 0.3)',
                }}
              >
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                Motion & Interaction
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Elevating user engagement through silky GSAP animations, Lenis smooth scrolling, masked reveals, and interactive scroll-driven storytelling without compromising performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.4 — ANIMATED VERTICAL TIMELINE DEVELOPMENT PROCESS
          ========================================================================= */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-default)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', margin: '0 auto 4rem' }}>
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
              // METHODOLOGY
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 1,
                letterSpacing: '0.03em',
              }}
            >
              DEVELOPMENT <span style={{ color: 'var(--color-orange-primary)' }}>PROCESS</span>
            </h2>
          </div>

          {/* Vertical Progressive Timeline */}
          <div className="process-vertical-timeline" style={{ position: 'relative', paddingLeft: '2.5rem' }}>
            {/* Background Track Line */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                bottom: '15px',
                left: '11px',
                width: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              }}
            />

            {/* Glowing Drawn Line */}
            <div
              ref={timelineLineRef}
              style={{
                position: 'absolute',
                top: '15px',
                left: '11px',
                width: '2px',
                background: 'linear-gradient(to bottom, var(--color-orange-bright), var(--color-orange-primary))',
                boxShadow: '0 0 10px var(--color-orange-primary)',
                borderRadius: '2px',
                zIndex: 2,
              }}
            />

            {/* Steps Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {/* Step 1 */}
              <div className="timeline-step-node" style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '1.25rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--color-orange-primary)',
                    boxShadow: '0 0 12px var(--color-orange-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF' }} />
                </div>

                <div className="glass-hud" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-orange-primary)' }}>
                      01
                    </span>
                    <h4 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Understand & Research</h4>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Analyze project objectives, user expectations, target platforms, and interactive scope. Establish architectural blueprints and responsive strategies before writing any code.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="timeline-step-node" style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '1.25rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--color-orange-primary)',
                    boxShadow: '0 0 12px var(--color-orange-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF' }} />
                </div>

                <div className="glass-hud" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-orange-primary)' }}>
                      02
                    </span>
                    <h4 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Design the Experience</h4>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Formulate dark-mode color harmonies, typographic hierarchies, 3D card perspectives, and fluid micro-animations. Ensure high readability, accessibility, and visual wow-factor.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="timeline-step-node" style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '1.25rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--color-orange-primary)',
                    boxShadow: '0 0 12px var(--color-orange-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF' }} />
                </div>

                <div className="glass-hud" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-orange-primary)' }}>
                      03
                    </span>
                    <h4 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Build & Integrate Functionality</h4>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Engineer modular React components, implement GSAP ScrollTrigger timelines, integrate Lenis smooth scrolling, and wire up live endpoints, forms, and services with clean state management.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="timeline-step-node" style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '1.25rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-primary)',
                    border: '2px solid var(--color-orange-primary)',
                    boxShadow: '0 0 12px var(--color-orange-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF' }} />
                </div>

                <div className="glass-hud" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-orange-primary)' }}>
                      04
                    </span>
                    <h4 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Test, Refine & Optimize</h4>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Audit across 320px to 1920px viewports, inspect production build bundles, verify clipboard actions and contact workflows, and eliminate layout shifts for 60fps performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7.5 — FINAL CTA
          ========================================================================= */}
      <section
        className="section-spacing"
        style={{
          borderTop: '1px solid var(--border-default)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-panel" style={{ padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1,
                letterSpacing: '0.03em',
                marginBottom: '1.25rem',
              }}
            >
              LET'S CREATE <span style={{ color: 'var(--color-orange-primary)' }}>SOMETHING MEANINGFUL.</span>
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              I am always open to discussing new web initiatives, creative projects, or technical opportunities.
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
              <Link to="/projects" className="btn-primary">
                <span>EXPLORE PROJECTS</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                <span>CONTACT ME</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .about-character-col {
            order: -1;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};
