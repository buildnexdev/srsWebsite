import { useState, useEffect, useRef } from 'react'
import { teamMembers, type TeamMember } from './teamMembers.tsx'
import { FOOTER_CONFIG } from './footerConfig'
import './App.css'

function SRSLogo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="120" height="120" rx="20" fill="currentColor" fillOpacity="0.12" />
      <text x="60" y="52" textAnchor="middle" fill="currentColor" fontSize="36" fontWeight="700" fontFamily="'Playfair Display', serif">SRS</text>
      <path d="M32 78 L52 62 L72 72 L88 58" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="88" cy="58" r="4" fill="#d4af37" />
    </svg>
  )
}

function SocialIcon({ name }: { name: string }) {
  const props = { width: 20, height: 20, fill: 'currentColor', 'aria-hidden': true }
  switch (name) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
      )
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" {...props}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><path fill="none" stroke="currentColor" strokeWidth="2" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" /></svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" /></svg>
      )
    default:
      return null
  }
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [teamsDropdownOpen, setTeamsDropdownOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [aboutInView, setAboutInView] = useState<[boolean, boolean]>([false, false])
  const teamsRef = useRef<HTMLLIElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = aboutSectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setAboutInView([true, true])
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (teamsRef.current && !teamsRef.current.contains(e.target as Node)) {
        setTeamsDropdownOpen(false)
      }
    }
    if (teamsDropdownOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [teamsDropdownOpen])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo-wrapper">
            <SRSLogo className="navbar-logo" size={44} />
            <div className="logo-text">SRS <span>Smart Research Solution</span></div>
          </div>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li className={`nav-item-teams ${teamsDropdownOpen ? 'dropdown-open' : ''}`} ref={teamsRef}>
              <div
                className="teams-dropdown-wrapper"
                onMouseEnter={() => setTeamsDropdownOpen(true)}
                onMouseLeave={() => setTeamsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="nav-teams-trigger"
                  onClick={() => setTeamsDropdownOpen((v) => !v)}
                  aria-expanded={teamsDropdownOpen}
                  aria-haspopup="true"
                >
                  Teams <span className="nav-chevron">▼</span>
                </button>
                <div className={`teams-dropdown ${teamsDropdownOpen ? 'open' : ''}`}>
                {teamMembers.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    className="teams-dropdown-item"
                    onClick={() => {
                      setSelectedMember(member)
                      setTeamsDropdownOpen(false)
                    }}
                  >
                    <span className="teams-dropdown-name">{member.name}</span>
                    <span className="teams-dropdown-profession">{member.profession}</span>
                  </button>
                ))}
                </div>
              </div>
            </li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">Driving Excellence Through <span>Evidence-Based</span> Research</h1>
          <p className="hero-subtitle">Multidisciplinary expertise in public health, infectious disease surveillance, and large-scale field implementation.</p>
          <div className="hero-btns">
            <a href="#about" className="btn btn-primary">Learn More</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section about-section-particles">
        <div className="about-particles" aria-hidden="true" />
        <div className="container" ref={aboutSectionRef}>
          <div
            className={`about-block about-block-animate ${aboutInView[0] ? 'about-block-visible' : ''}`}
          >
            <h2 className="section-title">Our Mission</h2>
            <p className="about-text">
              <strong>T</strong>o provide <strong>high-quality research solutions</strong> that transform raw data into <strong>meaningful insight</strong>, enabling our clients to achieve <strong>measurable impact</strong> and satisfaction.
            </p>
          </div>
          <div
            className={`about-block about-block-animate ${aboutInView[1] ? 'about-block-visible' : ''}`}
          >
            <h2 className="section-title">Our Vision</h2>
            <p className="about-text">
              <strong>T</strong>o gain recognition as a <strong>premier research partner</strong>, esteemed for its <strong>professionalism, precision, and innovative approach</strong> in every project, along with field observations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section team-section">
        <div className="container">
          <h2 className="section-title">Leadership Team</h2>
          <div className="team-grid team-grid-four">
            {teamMembers.map((member, index) => (
              <button
                key={member.id}
                type="button"
                className="team-card team-card-no-image glass-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedMember(member)}
              >
                <div className="team-info-content">
                  <h3>{member.name}</h3>
                  <p className="role">{member.profession}</p>
                  <p className="description">{member.shortDescription}</p>
                  {member.expertise.length > 0 && (
                    <ul className="expertise-list">
                      {member.expertise.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Experience */}
      <section id="services" className="section services-section">
        <div className="container">
          <h2 className="section-title">Our Expertise</h2>
          <div className="services-grid">
            <div className="service-item glass-card">
              <h4>Public Health & Epidemiology</h4>
              <p>Strengthening surveillance systems for SARI, ILI, and AFI. Specialized in field surveillance evaluation across 12 districts of Tamil Nadu.</p>
              <ul className="mini-list">
                <li>Outbreak Investigations</li>
                <li>Infectious Disease Research</li>
                <li>Contact Tracing Analysis</li>
              </ul>
            </div>
            <div className="service-item glass-card">
              <h4>Socio-Economic Surveys</h4>
              <p>Large-scale survey supervision (NCAER) including Women's Empowerment and Youth engaging "Orange Economic" studies.</p>
              <ul className="mini-list">
                <li>Field Team Management</li>
                <li>Quality Control & Validation</li>
                <li>Logistics Coordination</li>
              </ul>
            </div>
            <div className="service-item glass-card">
              <h4>Program Management</h4>
              <p>Technical and project management for international health initiatives, including USA-based AMR programs.</p>
              <ul className="mini-list">
                <li>Stakeholder Coordination</li>
                <li>Protocol Development</li>
                <li>M&E Frameworks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="section highlights-section">
        <div className="container">
          <h2 className="section-title">Key Projects & Highlights</h2>
          <div className="highlights-container">
            <div className="highlight-row">
              <div className="highlight-content">
                <h5>ICMR COVID-19 Response</h5>
                <p>Contributed to field evaluation studies across 12 districts, focusing on case identification and laboratory referral systems.</p>
              </div>
              <div className="highlight-content">
                <h5>Vellore Outbreak Investigation</h5>
                <p>Detailed documentation and situation assessment of the COVID-19 outbreak in the Paiyur refugee camp.</p>
              </div>
              <div className="highlight-content">
                <h5>TNHPS Survey Coordination</h5>
                <p>Leadership in the Tamil Nadu Household Panel Systems Project across various districts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team member profile modal */}
      {selectedMember && (
        <div
          className="team-modal-overlay"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-title"
        >
          <div className="team-modal" onClick={(e) => e.stopPropagation()}>
            <div className="team-modal-header">
              <h2 id="team-modal-title">{selectedMember.name}</h2>
              <p className="team-modal-role">{selectedMember.profession}</p>
              <button
                type="button"
                className="team-modal-close"
                onClick={() => setSelectedMember(null)}
                aria-label="Close profile"
              >
                ×
              </button>
            </div>
            <div className="team-modal-body">{selectedMember.fullProfile}</div>
          </div>
        </div>
      )}

      {/* Contact Us – above footer */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="contact-tagline">Get in touch for a free consultation or quote.</p>
          <div className="contact-card">
            <div className="contact-card-form">
              <h3 className="contact-form-title">Get a Free Quote</h3>
              <form
                className="contact-form"
                action={`https://formspree.io/f/${FOOTER_CONFIG.formspreeFormId}`}
                method="post"
              >
                <div className="contact-form-row">
                  <input type="text" name="first_name" placeholder="First Name" required aria-label="First name" />
                  <input type="text" name="last_name" placeholder="Last Name" required aria-label="Last name" />
                </div>
                <input type="email" name="email" placeholder="Email Address" required aria-label="Email" />
                <input type="tel" name="phone" placeholder="Phone Number" aria-label="Phone number" />
                <textarea name="message" rows={4} placeholder="Project Details" required aria-label="Project details" />
                <button type="submit" className="btn contact-form-submit">Submit</button>
              </form>
            </div>
            <div className="contact-card-details">
              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  </span>
                  <div>
                    <strong>Our Location</strong>
                    <p>{FOOTER_CONFIG.address.line1}<br />{FOOTER_CONFIG.address.line2}</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </span>
                  <div>
                    <strong>Call Us</strong>
                    <p className="contact-phone-list">
                      {FOOTER_CONFIG.phone.map((num) => (
                        <a key={num} href={`tel:${num.replace(/\s/g, '')}`}>{num}</a>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </span>
                  <div>
                    <strong>Email Us</strong>
                    <p><a href={`mailto:${FOOTER_CONFIG.email}`}>{FOOTER_CONFIG.email}</a></p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                  </span>
                  <div>
                    <strong>Working Hours</strong>
                    <p>{FOOTER_CONFIG.workingHours}</p>
                  </div>
                </div>
              </div>
              {FOOTER_CONFIG.mapEmbedUrl ? (
                <div className="contact-map-wrap">
                  <a href={FOOTER_CONFIG.mapsLink} target="_blank" rel="noopener noreferrer" className="contact-map-open">Open in Maps ↗</a>
                  <iframe title="Location map" src={FOOTER_CONFIG.mapEmbedUrl} className="contact-map" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              ) : (
                <div className="contact-map-placeholder">
                  <a href={FOOTER_CONFIG.mapsLink} target="_blank" rel="noopener noreferrer" className="btn contact-map-open-btn">Open in Maps ↗</a>
                  <p className="contact-map-hint">Add your address in footerConfig and a Google Maps embed URL to show the map here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer – BuildNex-style layout */}
      <footer className="footer footer-buildnex bg-primary">
        <span id="privacy-policy" className="footer-anchor" aria-hidden="true" />
        <span id="terms" className="footer-anchor" aria-hidden="true" />
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand-block">
              <div className="footer-brand-head">
                <SRSLogo className="footer-logo-img" size={48} />
                <h3 className="footer-logo-inline">SRS <span className="footer-logo-accent">Smart Research Solution</span></h3>
              </div>
              <span className="footer-logo-underline" aria-hidden="true" />
              <p className="footer-tagline">The power of research. Transforming data into insight for measurable impact.</p>
              <div className="footer-social">
                {FOOTER_CONFIG.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-touch-block">
              <h4 className="footer-touch-title">GET IN TOUCH</h4>
              <ul className="footer-touch-list">
                <li>
                  <span className="footer-touch-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
                  </span>
                  <span>{FOOTER_CONFIG.address.line1}, {FOOTER_CONFIG.address.line2}</span>
                </li>
                <li>
                  <span className="footer-touch-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </span>
                  <span className="footer-touch-phones">
                    {FOOTER_CONFIG.phone.map((num) => (
                      <a key={num} href={`tel:${num.replace(/\s/g, '')}`}>{num}</a>
                    ))}
                  </span>
                </li>
                <li>
                  <span className="footer-touch-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </span>
                  <a href={`mailto:${FOOTER_CONFIG.email}`}>{FOOTER_CONFIG.email}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              <a href="#terms">Terms &amp; Conditions</a>
              <span className="footer-legal-sep">·</span>
              <a href="#privacy-policy">Privacy Policy</a>
            </div>
            <div className="footer-bottom-right">
              <p className="footer-copyright">&copy; 2026 Smart Research Solution. All rights reserved.</p>
              <p className="footer-credit">
                Made with <span className="footer-heart" aria-hidden="true">❤️</span> by{' '}
                <a href={FOOTER_CONFIG.buildNexUrl} target="_blank" rel="noopener noreferrer">BuildNexDev</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${FOOTER_CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}

export default App
