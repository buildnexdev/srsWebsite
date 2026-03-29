import { useState, useEffect, useRef } from 'react'
import { FOOTER_CONFIG } from './footerConfig'
import SurveyPhotos from './SurveyPhotos'
import './App.css'

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  bio?: string;
  phoneNumber?: string;
  tags?: string;
  imageUrl?: string;
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

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const API_URL = 'http://localhost:3000'
  const COMPANY_ID = 3

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/content/team-members/${COMPANY_ID}`)
        const data = await response.json()
        if (data.success && data.data) {
          setTeamMembers(data.data)
        }
      } catch (error) {
        console.error('Error fetching team members:', error)
      }
    }
    fetchTeam()
  }, [])

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
      setIsScrolled(window.scrollY > 50)
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
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error()
      form.reset()
      setContactSuccess(true)
      window.setTimeout(() => setContactSuccess(false), 4000)
    } catch {
      setContactError('Could not send your message. Please try again.')
    } finally {
      setContactSubmitting(false)
    }
  }

  const renderBioSections = (bio: string) => {
    if (!bio) return null;
    const sectionHeads = [
      'Professional Profile',
      'Professional Experience',
      'Key Responsibilities and Contributions',
      'Core Competencies',
      'Special Skills',
      'Language Proficiency'
    ];
    
    // Split by any of the predefined section headers
    const pattern = new RegExp(`\\n(?=${sectionHeads.join('|')})`, 'i');
    const parts = bio.split(pattern);

    const parseExperienceTable = (text: string) => {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      const headerTerms = [
        'Period',
        'Employing organization',
        'Country',
        'Summary of activities'
      ];
      
      // Remove lines that are just headers
      const dataLines = lines.filter(l => !headerTerms.some(h => l.includes(h)));
      const rows = [];
      
      // Each row has 4 columns: Period, Org/Title, Country, Summary
      for (let i = 0; i < dataLines.length; i += 4) {
        if (dataLines[i]) {
          rows.push({
            period: dataLines[i] || '',
            org: dataLines[i+1] || '',
            country: dataLines[i+2] || '',
            summary: dataLines[i+3] || ''
          });
        }
      }

      if (rows.length === 0) return <p className="bio-text" style={{ whiteSpace: 'pre-line' }}>{text}</p>;

      return (
        <div className="bio-experience-table">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead className="bio-experience-thead">
              <tr>
                <th style={{ width: '140px' }}>Period</th>
                <th style={{ width: '280px' }}>Employing organization and your title/position</th>
                <th style={{ width: '100px', textAlign: 'center' }}>Country</th>
                <th>Summary of activities performed relevant to the Assignment</th>
              </tr>
            </thead>
            <tbody className="bio-experience-tbody">
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="bio-experience-period">{row.period}</td>
                  <td className="bio-experience-org">{row.org}</td>
                  <td className="bio-experience-country">{row.country}</td>
                  <td className="bio-experience-summary">{row.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    const parseResponsibilities = (text: string) => {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const sections: { num: string, title: string, items: string[] }[] = [];
      
      let currentSection: { num: string, title: string, items: string[] } | null = null;
      
      lines.forEach(line => {
        // Check if line is just a number
        if (/^\d+$/.test(line)) {
          if (currentSection) sections.push(currentSection);
          currentSection = { num: line, title: '', items: [] };
        } else if (currentSection && !currentSection.title) {
          // The line after a number is the title
          currentSection.title = line;
        } else if (currentSection) {
          // Subsequent lines are bullet points
          currentSection.items.push(line);
        }
      });
      
      if (currentSection) sections.push(currentSection);
      
      if (sections.length === 0) return <p className="bio-text" style={{ whiteSpace: 'pre-line' }}>{text}</p>;

      return (
        <div className="bio-responsibilities-container">
          {sections.map((sec, i) => (
            <div key={i} className="bio-responsibilities-row" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="bio-responsibilities-num">{sec.num}</div>
              <div className="bio-responsibilities-content">
                <h5 className="bio-responsibilities-title">{sec.title}</h5>
                <ul className="bio-responsibilities-list">
                  {sec.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      );
    };

    return parts.map((part, idx) => {
      const trimmed = part.trim();
      if (!trimmed) return null;
      
      const lines = trimmed.split('\n');
      const firstLine = lines[0].trim();
      
      // Determine if the firstLine matches one of our headers
      const isHeader = sectionHeads.some(h => firstLine.toLowerCase() === h.toLowerCase());
      
      if (isHeader) {
        const content = lines.slice(1).join('\n').trim();
        const lowHead = firstLine.toLowerCase();
        
        return (
          <div key={idx} className="bio-section">
            <h4 className="bio-section-title">{firstLine}</h4>
            <div className="bio-content">
              {lowHead === 'professional experience' ? parseExperienceTable(content) : 
                lowHead === 'key responsibilities and contributions' ? parseResponsibilities(content) : (
                <div className="bio-text" style={{ whiteSpace: 'pre-line' }}>{content}</div>
              )}
            </div>
          </div>
        );
      }
      
      return (
        <div key={idx} className="bio-section">
          {idx === 0 && !isHeader ? <h4 className="bio-section-title">Biography</h4> : null}
          <p className="bio-text" style={{ whiteSpace: 'pre-line' }}>{trimmed}</p>
        </div>
      );
    });
  };

  return (
    <div className="app">
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
            <li className="nav-item-teams" ref={teamsRef}>
              <div 
                className="teams-dropdown-wrapper" 
                onMouseEnter={() => setTeamsDropdownOpen(true)}
                onMouseLeave={() => setTeamsDropdownOpen(false)}
              >
                <button 
                  className="nav-teams-trigger" 
                  onClick={() => setTeamsDropdownOpen(!teamsDropdownOpen)}
                >
                  Teams <span className="nav-chevron">▼</span>
                </button>
                <div className={`teams-dropdown ${teamsDropdownOpen ? 'open' : ''}`}>
                  {teamMembers.map(member => (
                    <button 
                      key={member.id} 
                      className="teams-dropdown-item"
                      onClick={() => { setSelectedMember(member); setTeamsDropdownOpen(false); }}
                    >
                      <span className="teams-dropdown-name">{member.name}</span>
                      <span className="teams-dropdown-profession">{member.designation}</span>
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

      <section id="about" className="section about-section about-section-particles">
        <div className="about-particles" aria-hidden="true" />
        <div className="container about-container-inner" ref={aboutSectionRef}>
          <div className="about-content">
            <div className={`about-mission-who-row about-block-animate ${aboutInView[0] ? 'about-block-visible' : ''}`}>
              <div className="about-block about-block-left">
                <h2 className="section-title">Our Mission</h2>
                <p className="about-text">To provide high-quality research solutions that transform data into insight.</p>
              </div>
              <div className="about-divider" aria-hidden="true" />
              <div className="about-block about-block-right">
                <h2 className="section-title">Who We Are</h2>
                <p className="about-text">Smart Research Solution is dedicated to accurate, reliable insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section team-section">
        <div className="container">
          <h2 className="section-title">Leadership Team</h2>
          <div className="team-grid team-grid-four">
            {teamMembers.map((member, i) => (
              <button 
                key={member.id} 
                className="team-card-premium animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => setSelectedMember(member)}
              >
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.designation}</p>
                <p className="team-card-bio-teaser">{member.bio?.substring(0, 140)}...</p>
                {member.tags && (
                  <div className="team-card-tags">
                    {member.tags.split(',').map((tag, idx) => (
                      <span key={idx} className="team-tag-pill">{tag.trim()}</span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedMember && (
        <div className="member-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="member-modal-container" onClick={e => e.stopPropagation()}>
            <div className="member-modal-header">
              <div className="member-modal-header-content">
                <h2 className="member-modal-name">{selectedMember.name}</h2>
                <p className="member-modal-designation">{selectedMember.designation}</p>
              </div>
              <button className="member-modal-close" onClick={() => setSelectedMember(null)}>&times;</button>
            </div>
            <div className="member-modal-body">
              {renderBioSections(selectedMember.bio || '')}
              {selectedMember.tags && (
                <div className="bio-section">
                  <h4 className="bio-section-title">Core Competencies</h4>
                  <ul className="member-modal-tags-list">
                    {selectedMember.tags.split(',').map((tag, i) => (
                      <li key={i}>{tag.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <SurveyPhotos />

      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-card">
            <div className="contact-card-form">
              <h3 className="contact-form-title">Message Us</h3>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input type="text" name="name" placeholder="Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <textarea name="message" rows={4} placeholder="Your Message" required />
                <button type="submit" className="btn contact-form-submit" disabled={contactSubmitting}>
                  {contactSubmitting ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
            <div className="contact-card-details">
              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>
                  </span>
                  <div>
                    <strong>Location</strong>
                    <p>{FOOTER_CONFIG.address.line1}, {FOOTER_CONFIG.address.line2}</p>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                  </span>
                  <div>
                    <strong>Phone</strong>
                    <p>{FOOTER_CONFIG.phone.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-buildnex bg-primary">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2026 Smart Research Solution. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
