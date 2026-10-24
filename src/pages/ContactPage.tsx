import React, { useState, useEffect, useRef } from 'react';
import { contactInfo } from '../data/navigation';
import { TextScramble } from '../components/TextScramble';
import { MessageCircle, Mail, Copy, Check, Send, AlertCircle, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export const ContactPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: 'Web Development',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade-elem',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(contactInfo.email.address);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 3000);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = contactInfo.email.address;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 3000);
      }
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details about your project.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        projectType: 'Web Development',
        budget: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =========================================================================
          SECTION 10.1 — CONTACT HERO
          ========================================================================= */}
      <section
        style={{
          paddingTop: 'calc(var(--header-height) + 3rem)',
          paddingBottom: '3rem',
          position: 'relative',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '750px' }}>
            <TextScramble
              text="// GET IN TOUCH"
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
              className="contact-fade-elem font-display"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                lineHeight: 0.95,
                letterSpacing: '0.02em',
                margin: '0.25rem 0',
              }}
            >
              LET'S BUILD <span style={{ color: 'var(--color-orange-primary)' }}>SOMETHING GREAT.</span>
            </h1>

            <p
              className="contact-fade-elem"
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                marginTop: '0.75rem',
                lineHeight: 1.6,
              }}
            >
              Have a project in mind? Let's talk about bringing it to life. Reach out directly via WhatsApp, email, or through the message form below.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10.2, 10.3 & 10.4 — GLASS CONTACT CARDS & FORM
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
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
              gap: '3rem',
              alignItems: 'start',
            }}
            className="contact-main-grid"
          >
            {/* Left Column: Direct WhatsApp and Email Glass Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* WhatsApp Card */}
              <div className="glass-hud contact-fade-elem" style={{ padding: '2.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(37, 211, 102, 0.12)',
                      border: '1px solid rgba(37, 211, 102, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#25D366',
                      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)',
                    }}
                  >
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      INSTANT CHAT
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>WhatsApp</h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Fastest response for project inquiries, freelance availability, and collaborative ideas.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div
                    style={{
                      padding: '0.85rem 1.15rem',
                      backgroundColor: 'rgba(5, 5, 5, 0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{contactInfo.whatsapp.intl}</span>
                    <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>ONLINE</span>
                  </div>

                  <a
                    href={contactInfo.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={18} />
                    <span>CHAT ON WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="glass-hud contact-fade-elem" style={{ padding: '2.25rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 90, 0, 0.12)',
                      border: '1px solid rgba(255, 90, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-orange-primary)',
                      boxShadow: '0 4px 15px rgba(255, 90, 0, 0.25)',
                    }}
                  >
                    <Mail size={28} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      DIRECT INBOX
                    </span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>Email</h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  Ideal for detailed project scopes, requests for proposals, and contract discussions.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <a
                    href={contactInfo.email.url}
                    style={{
                      padding: '0.85rem 1.15rem',
                      backgroundColor: 'rgba(5, 5, 5, 0.65)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-orange-primary)',
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      wordBreak: 'break-all',
                    }}
                  >
                    <span>{contactInfo.email.address}</span>
                    <ArrowUpRight size={16} />
                  </a>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <a
                      href={contactInfo.email.url}
                      className="btn-secondary"
                      style={{ justifyContent: 'center', padding: '0.75rem 1rem' }}
                    >
                      <Mail size={16} />
                      <span>SEND EMAIL</span>
                    </a>

                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      className="btn-secondary"
                      style={{
                        justifyContent: 'center',
                        padding: '0.75rem 1rem',
                        borderColor: copiedEmail ? '#10B981' : undefined,
                        color: copiedEmail ? '#10B981' : undefined,
                      }}
                    >
                      {copiedEmail ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                      <span>{copiedEmail ? 'COPIED!' : 'COPY EMAIL'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Frosted Glass Contact Form */}
            <div className="glass-hud contact-fade-elem" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ marginBottom: '2rem' }}>
                <span
                  style={{
                    color: 'var(--color-orange-primary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  // SEND A DIRECT MESSAGE
                </span>
                <h3 style={{ fontSize: '1.75rem', marginTop: '0.25rem', color: 'var(--text-primary)' }}>
                  Project Inquiry Form
                </h3>
              </div>

              {submitSuccess ? (
                <div
                  style={{
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid #10B981',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10B981',
                      margin: '0 auto 1.25rem',
                    }}
                  >
                    <Check size={28} />
                  </div>
                  <h4 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Message Prepared Successfully!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Thank you! You can also reach out immediately via WhatsApp or Email using the direct links on this page.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="btn-secondary"
                  >
                    <span>SEND ANOTHER MESSAGE</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      style={{
                        width: '100%',
                        padding: '0.9rem 1.15rem',
                        backgroundColor: 'rgba(5, 5, 5, 0.7)',
                        border: errors.fullName ? '1px solid #EF4444' : '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-orange-primary)';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 90, 0, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.fullName ? '#EF4444' : 'var(--border-default)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.fullName && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                        <AlertCircle size={14} />
                        <span>{errors.fullName}</span>
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      style={{
                        width: '100%',
                        padding: '0.9rem 1.15rem',
                        backgroundColor: 'rgba(5, 5, 5, 0.7)',
                        border: errors.email ? '1px solid #EF4444' : '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-orange-primary)';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 90, 0, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.email ? '#EF4444' : 'var(--border-default)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.email && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                      </span>
                    )}
                  </div>

                  {/* Project Type & Budget Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label
                        htmlFor="projectType"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--text-secondary)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.15rem',
                          backgroundColor: 'rgba(5, 5, 5, 0.7)',
                          border: '1px solid var(--border-default)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          outline: 'none',
                        }}
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="UI/UX Interface Design">UI/UX Interface Design</option>
                        <option value="Full Website Build">Full Website Build</option>
                        <option value="Animation & Motion Design">Animation & Motion Design</option>
                        <option value="Other Inquiries">Other Inquiries</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--text-secondary)',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Budget Range (Optional)
                      </label>
                      <input
                        id="budget"
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. $500 - $2,000"
                        style={{
                          width: '100%',
                          padding: '0.9rem 1.15rem',
                          backgroundColor: 'rgba(5, 5, 5, 0.7)',
                          border: '1px solid var(--border-default)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project goals, timeline, and ideas..."
                      style={{
                        width: '100%',
                        padding: '0.9rem 1.15rem',
                        backgroundColor: 'rgba(5, 5, 5, 0.7)',
                        border: errors.message ? '1px solid #EF4444' : '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-orange-primary)';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 90, 0, 0.25)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = errors.message ? '#EF4444' : 'var(--border-default)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    {errors.message && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.75rem', marginTop: '0.35rem' }}>
                        <AlertCircle size={14} />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '1.05rem',
                      marginTop: '0.5rem',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? 'SENDING INQUIRY...' : 'SEND INQUIRY'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
