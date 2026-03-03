import { useState, useEffect } from 'react'
import srsLogo from './assets/logo.jpg'
import mariaImg from './assets/maria.png'
import umaImg from './assets/uma.png'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo-wrapper">
            <img src={srsLogo} alt="SRS Logo" className="navbar-logo" />
            <div className="logo-text">SRS <span>Smart Research Solution</span></div>
          </div>
          <ul className="nav-links">
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#team">Team</a></li>
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
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="about-text">
            Smart Research Solution is committed to strengthening public health systems through rigorous fieldwork, advanced data analysis, and effective data-driven strategies. Our team brings deep expertise in epidemiological surveillance and socio-economic research.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section team-section">
        <div className="container">
          <h2 className="section-title">Leadership Team</h2>
          <div className="team-grid">
            {/* Maria */}
            <div className="team-card glass-card animate-fade-in">
              <div className="team-image-wrapper">
                <img src={mariaImg} alt="Maria Jacquilin Mary" className="team-img" />
              </div>
              <div className="team-info-content">
                <h3>Maria Jacquilin Mary</h3>
                <p className="role">Researcher & Project Manager</p>
                <p className="description">
                  Expert in infectious disease research and epidemiological surveillance. Former Technical Assistant at ICMR with extensive experience in COVID-19 outbreak investigations.
                </p>
                <ul className="expertise-list">
                  <li>Field Epidemiology</li>
                  <li>Data Analysis</li>
                  <li>Protocols</li>
                </ul>
              </div>
            </div>

            {/* Uma */}
            <div className="team-card glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="team-image-wrapper">
                <img src={umaImg} alt="Mrs. Uma" className="team-img" />
              </div>
              <div className="team-info-content">
                <h3>Mrs. Uma</h3>
                <p className="role">State Co-ordinator</p>
                <p className="description">
                  Specialized training from Emory University, USA. Expert in large-scale manpower supply operations and field coordination across Tamil Nadu.
                </p>
                <ul className="expertise-list">
                  <li>Coordination</li>
                  <li>Management</li>
                  <li>Surveys</li>
                </ul>
              </div>
            </div>
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

      {/* Footer */}
      <footer id="contact" className="footer bg-primary">
        <div className="container footer-content">
          <div className="footer-info">
            <h3>SRS <span>Smart Research Solution</span></h3>
            <p>The power of research.</p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Smart Research Solution. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
