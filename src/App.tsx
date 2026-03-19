import { useState, useEffect, useRef } from 'react'
import { teamMembers, type TeamMember } from './teamMembers.tsx'
import { FOOTER_CONFIG } from './footerConfig'
import SurveyPhotos from './SurveyPhotos'
import './App.css'

/* Key Projects & Highlights – 5 areas from team profile */
const KEY_PROJECTS = [
  { title: '1. Survey Planning and Technical Implementation', desc: 'Technical aspects of survey design and execution; field methodologies tailored to project requirements; adherence to research protocols and quality standards; supervising field data collection and troubleshooting operational challenges.' },
  { title: '2. Large-Scale Survey Management', desc: 'Numerous large-scale national and regional studies over the past 20 years; coordinated multi-location survey operations ensuring timelines and quality benchmarks; high standards of data accuracy, validation, and reporting.' },
  { title: '3. Regional Monitoring &amp; Team Coordination', desc: 'Monitoring and supervising field activities at regional level in Tamil Nadu and Kerala; leading field teams, supervisors, and investigators; regular field visits for compliance; reviewing progress reports and implementing corrective measures.' },
  { title: '4. Training &amp; Capacity Building', desc: 'Training of Trainers (TOT) programs; Core Trainer for field investigators and supervisory staff; workshops on survey methodology, ethical practices, and field management; ongoing mentoring and performance feedback.' },
  { title: '5. Travel &amp; Project Coordination', desc: 'Extensive travel across India for project coordination, field supervision, staff training, and workshops; successfully managed diverse geographical assignments with cultural sensitivity and adaptability.' },
]

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
  const [contactSubmitting, setContactSubmitting] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [contactError, setContactError] = useState('')
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

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setContactSuccess(false)
    setContactError('')
    setContactSubmitting(true)

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const response = await fetch(`https://formspree.io/f/${FOOTER_CONFIG.formspreeFormId}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      form.reset()
      setContactSuccess(true)
      window.setTimeout(() => setContactSuccess(false), 4000)
    } catch {
      setContactError('Could not send your message. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo-wrapper">
            <img src="/logo.jpg" alt="SRS" className="navbar-logo" width={44} height={44} />
            <div className="logo-text">
              SRS <span>Smart Research Solution</span>
            </div>
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
            <li><a href="#survey-photos">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">Driving Excellence Through <span>Evidence-Based</span> Research</h1>
          <p className="hero-subtitle">Transforming data into powerful insights that drive smarter decisions and meaningful impact.</p>
          <div className="hero-btns">
            <a href="#about" className="btn btn-primary">Learn More</a>
            <a href="#contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* About Section – Who We Are, Mission, Vision, Values, Why Choose */}
      <section id="about" className="section about-section about-section-particles">
        <div className="about-particles" aria-hidden="true" />
        <div className="container about-container-inner" ref={aboutSectionRef}>
          <div className="about-content">
          <div className={`about-mission-who-row about-block-animate ${aboutInView[0] ? 'about-block-visible' : ''}`}>
            <div className="about-block about-block-left">
              <h2 className="section-title">Our Mission</h2>
              <p className="about-text">
                <strong>T</strong>o provide <strong>high-quality research solutions</strong> that transform raw data into <strong>meaningful insight</strong>, enabling our clients to achieve <strong>measurable impact</strong> and satisfaction.
              </p>
            </div>
            <div className="about-divider" aria-hidden="true" role="presentation">
              <span className="about-divider-line" />
            </div>
            <div className="about-block about-block-right">
              <h2 className="section-title">Who We Are</h2>
              <p className="about-text">
                Smart Research Solution – The power of research is a professional research company dedicated to delivering accurate, reliable, and actionable insights. With expertise in field data collection, data analysis, and report writing, we help organizations, businesses, and government agencies make informed and strategic decisions on time.
              </p>
            </div>
          </div>
          <div className={`about-block about-block-animate ${aboutInView[0] ? 'about-block-visible' : ''}`}>
            <h2 className="section-title">Our Vision</h2>
            <p className="about-text">
              <strong>T</strong>o gain recognition as a <strong>premier research partner</strong>, esteemed for its <strong>professionalism, precision, and innovative approach</strong> in every project, along with field observations.
            </p>
          </div>
          <div className={`about-block about-block-animate ${aboutInView[0] ? 'about-block-visible' : ''}`}>
            <h2 className="section-title">Our Values</h2>
            <ul className="about-values-list">
              <li><strong>Accuracy:</strong> We maintain the highest standards of data quality.</li>
              <li><strong>Integrity:</strong> Transparent, ethical research practices.</li>
              <li><strong>Innovation:</strong> Using advanced tools and methods to deliver insightful results.</li>
              <li><strong>Reliability:</strong> Timely, professional, and actionable outputs.</li>
            </ul>
          </div>
          <div className={`about-block about-block-animate ${aboutInView[0] ? 'about-block-visible' : ''}`}>
            <h2 className="section-title">Why Choose Smart Research Solution?</h2>
            <ul className="about-why-list">
              <li>Experienced research professionals</li>
              <li>Robust data collection and quality control methods</li>
              <li>Clear, actionable reporting</li>
              <li>Customized solutions to meet client needs</li>
            </ul>
          </div>
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

      {/* Services */}
      <section id="services" className="section services-section">
        <div className="container">
          <h2 className="section-title">Services</h2>
          <div className="services-grid">
            <div className="service-item glass-card">
              <h4>1. Data Collection</h4>
              <p>We specialize in systematic field data collection for research, surveys, and monitoring. Our team uses structured questionnaires, interviews, and observations to ensure accurate and representative data.</p>
              <p className="service-key-features">Key Features:</p>
              <ul className="mini-list">
                <li>Field surveys and interviews</li>
                <li>Observational studies</li>
                <li>Large-scale and small-scale data collection</li>
                <li>Quality control measures for accuracy</li>
              </ul>
            </div>
            <div className="service-item glass-card">
              <h4>2. Data Analysis</h4>
              <p>Transform raw data into actionable insights with our advanced analytical techniques. We use statistical, thematic, and trend analysis to help clients make data-driven decisions.</p>
              <p className="service-key-features">Key Features:</p>
              <ul className="mini-list">
                <li>Quantitative and qualitative analysis</li>
                <li>Trend and pattern identification</li>
                <li>Data visualization and reporting</li>
                <li>Customized analytical solutions</li>
              </ul>
            </div>
            <div className="service-item glass-card">
              <h4>3. Report Writing</h4>
              <p>We provide professional, comprehensive reports that clearly present findings, insights, and recommendations. Our reports are tailored to your audience, ensuring clarity and impact.</p>
              <p className="service-key-features">Key Features:</p>
              <ul className="mini-list">
                <li>Structured and concise reporting</li>
                <li>Graphs, charts, and visualizations</li>
                <li>Executive summaries and recommendations</li>
                <li>Reports suitable for stakeholders, management, or publication</li>
              </ul>
            </div>
          </div>
          <div className="service-addons">
            <h3 className="service-addons-title">Optional Add-On Services</h3>
            <ul className="about-why-list">
              <li>Policy brief preparation</li>
              <li>Monitoring and evaluation support</li>
              <li>Research consultancy and advisory</li>
            </ul>
          </div>
          <p className="services-tagline">Join with us to turn data into insight and insight into impact.</p>
        </div>
      </section>

      {/* Experience Highlights – projects from team profile (e.g. Elango) */}
      <section className="section highlights-section">
        <div className="container">
          <h2 className="section-title">Key Projects & Highlights</h2>
          <p className="highlights-intro">Core areas of expertise: survey planning, large-scale management, regional monitoring, training, and project coordination.</p>
          <div className="highlights-grid">
            {KEY_PROJECTS.map((project, i) => (
              <div
                key={i}
                className="highlight-card"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <span className="highlight-card-num">{i + 1}</span>
                <h5 dangerouslySetInnerHTML={{ __html: project.title }} />
                <p>{project.desc}</p>
              </div>
            ))}
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

      {/* Survey Photos Section */}
      <SurveyPhotos />

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
                onSubmit={handleContactSubmit}
              >
                <div className="contact-form-row">
                  <input type="text" name="name" placeholder="Full Name" required aria-label="Full name" />
                </div>
                <input type="email" name="email" placeholder="Email Address" required aria-label="Email" />
                <input type="tel" name="phone" placeholder="Phone Number" aria-label="Phone number" />
                <textarea name="message" rows={4} placeholder="Project Details" required aria-label="Project details" />
                <button type="submit" className="btn contact-form-submit" disabled={contactSubmitting}>
                  {contactSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {contactSuccess && (
                  <p role="status" aria-live="polite" className="contact-form-success">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {contactError && (
                  <p role="alert" className="contact-form-error">
                    {contactError}
                  </p>
                )}
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
                <img src="/logo.jpg" alt="SRS" className="footer-logo-img" width={48} height={48} />
                <h3 className="footer-logo-inline">
                  SRS <span className="footer-logo-accent">Smart Research Solution</span>
                  <small className="footer-gst-text">GST: 33CRKPS7432M1Z6</small>
                </h3>
              </div>
              <span className="footer-logo-underline" aria-hidden="true" />
              <p className="footer-tagline">The power of research. Transforming data into insight for measurable impact.</p>
              {/* <div className="footer-social">
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
              </div> */}
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
            <div className="footer-legal-sparkles" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
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
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.55 0 .25 5.3.25 11.81c0 2.08.54 4.11 1.57 5.9L0 24l6.47-1.69a11.76 11.76 0 0 0 5.59 1.42h.01c6.51 0 11.81-5.3 11.81-11.81 0-3.15-1.23-6.1-3.36-8.44ZM12.07 21.7h-.01a9.79 9.79 0 0 1-4.99-1.36l-.36-.21-3.84 1 1.03-3.74-.23-.38a9.8 9.8 0 0 1-1.5-5.2C2.17 6.4 6.58 2 12.06 2c2.61 0 5.05 1.01 6.89 2.85a9.7 9.7 0 0 1 2.86 6.95c0 5.48-4.41 9.9-9.74 9.9Zm5.44-7.42c-.3-.15-1.78-.88-2.06-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.08-.3-.15-1.24-.46-2.37-1.47-.87-.78-1.46-1.75-1.63-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.27.3-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.2 3.05.15.2 2.08 3.17 5.04 4.44.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.78-.73 2.03-1.44.25-.7.25-1.3.17-1.44-.08-.14-.27-.22-.57-.37Z" />
        </svg>
      </a>

      {/* Floating Email */}
      <a
        href={`mailto:${FOOTER_CONFIG.email}`}
        className="email-float"
        aria-label="Email us"
        title="Email us"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </a>
    </div>
  )
}

export default App
