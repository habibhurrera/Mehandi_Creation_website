import { useState } from 'react';
import { Preloader } from './components/Preloader';
import './styles/preloader.css';
import { VideoScrollHero } from './components/ui/video-scroll-hero';
import ImageReveal from './components/ui/image-tiles';
import { Reveal, RevealGroup, RevealItem } from './components/Reveal';
import { Heart, Sparkles, MapPin, Mail, Calendar, CheckCircle, ArrowLeft, Menu, X, Phone, MessageCircle, Award, GraduationCap, Star, Users, Palette } from 'lucide-react';

// Brand glyph not shipped by this lucide build — small inline Instagram mark.
const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Luxury Cinematic Preloader */}
      {!preloaderComplete && (
        <Preloader onComplete={() => setPreloaderComplete(true)} />
      )}

      {/* Main Luxury Website Content */}
      <div className={`main-website ${preloaderComplete ? 'website-visible' : 'website-hidden'}`}>
        
        {/* Upper Left Back Arrow Button */}
        <button 
          className="back-to-intro-btn" 
          onClick={() => setPreloaderComplete(false)}
          title="Return to Intro Sequence"
          aria-label="Return to Intro"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Navigation Bar */}
        <header className="nav-header">
          <div className="nav-logo">
            <span className="logo-text-mehandi">Mehndi</span>
            <span className="logo-text-creation">Creation</span>
          </div>
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            <a href="#about" className="nav-item" onClick={() => setMenuOpen(false)}>About Ilma</a>
            <a href="#services" className="nav-item" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#gallery" className="nav-item" onClick={() => setMenuOpen(false)}>Gallery</a>
            <a href="#training" className="nav-item" onClick={() => setMenuOpen(false)}>Training</a>
            <a href="#contact" className="nav-item" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#contact" className="nav-cta-btn" onClick={() => setMenuOpen(false)}>Book Now</a>
          </nav>
        </header>

        {/* Cinematic scroll-to-scale video hero */}
        <VideoScrollHero videoSrc="/hello.mp4" />

        {/* Hero Section */}
        <section className="hero-section">
          <Reveal className="hero-content" direction="right">
            <div className="badge">
              <Sparkles size={12} className="gold-icon" />
              <span>Internationally Recognized Mehndi Artist &amp; Educator</span>
            </div>
            <h1 className="hero-title">
              Transforming Mehndi Into <br />
              <span className="accent-text">Art, Culture &amp; Storytelling</span>
            </h1>
            <p className="hero-subtitle">
              Learn from Ilma Multani, an internationally recognized Mehndi Artist, Educator, and Creative Mentor with over 10 years of experience in bridal henna, advanced design techniques, and professional artist coaching.
            </p>
            <p className="hero-subtitle hero-subtitle-secondary">
              From breathtaking bridal Mehndi to internationally acclaimed training programs, Ilma helps clients celebrate life's most precious moments while empowering aspiring artists to build successful careers in the henna industry.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-solid">Book Bridal Mehndi</a>
              <a href="#training" className="btn-outline">Join Training Program</a>
            </div>
          </Reveal>
          <Reveal className="hero-visual" direction="left" delay={0.15}>
            <div className="visual-card">
              <div className="visual-image-placeholder">
                <div className="mandala-sketch"></div>
              </div>
              <div className="artist-info-card">
                <div className="artist-avatar">IM</div>
                <div>
                  <h4 className="artist-name">Ilma Multani</h4>
                  <p className="artist-title">Mehndi Artist, Educator &amp; Mentor</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Quick Statistics */}
        <section className="stats-bar">
          <RevealGroup className="stats-grid" stagger={0.1}>
            <RevealItem className="stat-item">
              <div className="stat-value">10+</div>
              <div className="stat-label">Years Experience</div>
            </RevealItem>
            <RevealItem className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">Students Trained</div>
            </RevealItem>
            <RevealItem className="stat-item">
              <div className="stat-value">Global</div>
              <div className="stat-label">International Training Programs</div>
            </RevealItem>
            <RevealItem className="stat-item">
              <div className="stat-value">Bridal &amp; Pro</div>
              <div className="stat-label">Mehndi Specialist</div>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-grid">
            <Reveal className="about-text" direction="right">
              <div className="section-label">The Artist</div>
              <h2 className="section-title">Meet Ilma Multani</h2>
              <p>
                Ilma Multani is a passionate Mehndi Artist, Trainer, and Creative Entrepreneur based in Nagina, Bijnor, Uttar Pradesh, India. With more than a decade of professional experience, she has established herself as a trusted name in bridal Mehndi artistry and professional henna education.
              </p>
              <p>
                As the Co-Founder and Chief Creative Director of MehndiCulture, Ilma has dedicated her career to preserving traditional henna art while introducing innovative modern concepts that inspire artists around the world. Through her training programs, she empowers aspiring Mehndi artists with technical expertise, business knowledge, and creative confidence.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>Co-Founder &amp; Chief Creative Director, MehndiCulture</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>Concept-Based, 100% Natural Henna Artistry</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>International Training Programs &amp; Workshops</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="about-media" direction="left" delay={0.1}>
              <div className="media-ring"></div>
              <div className="media-box">
                <div className="signature-glow"></div>
                <div className="media-caption">Ilma Multani Signature Mark</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why Choose Ilma */}
        <section id="why" className="why-section">
          <Reveal className="section-header">
            <div className="section-label">Why Choose Ilma</div>
            <h2 className="section-title">Artistry Rooted in Trust &amp; Excellence</h2>
            <p className="section-subtitle">More than a Mehndi service — a thoughtful, safe, and deeply personal experience crafted around every client and every celebration.</p>
          </Reveal>
          <RevealGroup className="why-grid" stagger={0.1}>
            <RevealItem className="why-card">
              <div className="why-icon-box"><Award size={22} /></div>
              <h3 className="why-title">100% Natural Henna</h3>
              <p className="why-desc">Only pure, skin-safe, chemical-free henna — rich stain, soothing aroma, and zero compromise on your wellbeing.</p>
            </RevealItem>
            <RevealItem className="why-card">
              <div className="why-icon-box"><Palette size={22} /></div>
              <h3 className="why-title">Concept-Based Artistry</h3>
              <p className="why-desc">Designs built around your story — names, dates, motifs and meaning woven into every intricate detail.</p>
            </RevealItem>
            <RevealItem className="why-card">
              <div className="why-icon-box"><GraduationCap size={22} /></div>
              <h3 className="why-title">Internationally Certified</h3>
              <p className="why-desc">A decade of experience and a globally recognised training reputation behind every line and curve.</p>
            </RevealItem>
            <RevealItem className="why-card">
              <div className="why-icon-box"><Heart size={22} /></div>
              <h3 className="why-title">Personalized Experience</h3>
              <p className="why-desc">Calm, unhurried, and detail-obsessed — your comfort and vision guide the whole session.</p>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* Signature Approach */}
        <section className="signature-section">
          <Reveal className="signature-inner">
            <div className="section-label light-label">The Signature Approach</div>
            <h2 className="signature-title">Concept-Based Mehndi — Where Henna Becomes Storytelling</h2>
            <p className="signature-text">
              Ilma's signature style moves beyond decoration. Every design begins with a conversation — your
              celebration, your culture, the people and moments that matter — then transforms into a bespoke
              composition of motifs, symbols, and hidden details unique to you. It is Mehndi as art, memory,
              and meaning, applied with 100% natural henna and a craftsperson's patience.
            </p>
            <div className="signature-points">
              <div className="signature-point"><CheckCircle size={16} className="feature-icon" /><span>Custom concepts &amp; hidden initials</span></div>
              <div className="signature-point"><CheckCircle size={16} className="feature-icon" /><span>Cultural &amp; contemporary fusion</span></div>
              <div className="signature-point"><CheckCircle size={16} className="feature-icon" /><span>Natural henna, deep lasting stain</span></div>
            </div>
          </Reveal>
        </section>

        {/* Gallery / Her Work Section */}
        <section id="gallery" className="gallery-section">
          <Reveal className="section-header">
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">Featured Mehndi Creations</h2>
            <p className="section-subtitle">Explore a collection of bridal masterpieces, contemporary patterns, cultural artwork, and student success stories created through years of artistic excellence.</p>
          </Reveal>
          {/* Desktop: hover-fanned stack */}
          <div className="gallery-reveal">
            <ImageReveal
              leftImage="https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=600&q=80&auto=format&fit=crop"
              middleImage="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=600&q=80&auto=format&fit=crop"
              rightImage="https://images.unsplash.com/photo-1602910344008-22f323cc1817?w=600&q=80&auto=format&fit=crop"
            />
          </div>

          {/* Mobile: swipeable strip (no hover on touch) */}
          <div className="gallery-mobile">
            {[
              'https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=600&q=80&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=600&q=80&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1602910344008-22f323cc1817?w=600&q=80&auto=format&fit=crop',
            ].map((src, i) => (
              <div className="gm-card" key={i}>
                <img src={src} alt="Mehndi design" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="gallery-swipe-hint">Swipe to explore →</p>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <Reveal className="section-header">
            <div className="section-label">Services</div>
            <h2 className="section-title">What Ilma Offers</h2>
            <p className="section-subtitle">Bespoke henna artistry for weddings, celebrations, and personal stories.</p>
          </Reveal>

          <RevealGroup className="services-grid" stagger={0.12}>
            <RevealItem className="service-card">
              <div className="service-icon-box">
                <Heart size={24} className="service-icon" />
              </div>
              <h3 className="service-name">Bridal Mehndi</h3>
              <p className="service-desc">
                Luxury bridal Mehndi designs crafted with precision, elegance, and personalization for weddings and special occasions.
              </p>
              <div className="service-price">From ₹200</div>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon-box">
                <Sparkles size={24} className="service-icon" />
              </div>
              <h3 className="service-name">Custom Mehndi Designs</h3>
              <p className="service-desc">
                Personalized Mehndi artwork designed to reflect individual stories, cultures, celebrations, and creative concepts.
              </p>
              <div className="service-price">Custom Pricing</div>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon-box">
                <Calendar size={24} className="service-icon" />
              </div>
              <h3 className="service-name">Festival &amp; Event Mehndi</h3>
              <p className="service-desc">
                Beautiful designs for festivals, family celebrations, engagements, baby showers, and cultural events.
              </p>
              <div className="service-price">On Request</div>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* Training & Courses */}
        <section id="training" className="training-section">
          <div className="training-grid">
            <Reveal className="training-text" direction="right">
              <div className="section-label">Training &amp; Courses</div>
              <h2 className="section-title">Become a Professional Mehndi Artist</h2>
              <p className="training-lead">
                Learn directly from Ilma Multani through structured, hands-on programs designed to take you from
                fundamentals to advanced bridal artistry — and to build a real, sustainable career in henna.
              </p>
              <div className="training-points">
                <div className="feature-item"><CheckCircle size={16} className="feature-icon" /><span>Beginner to advanced bridal modules</span></div>
                <div className="feature-item"><CheckCircle size={16} className="feature-icon" /><span>Concept-based design &amp; composition</span></div>
                <div className="feature-item"><CheckCircle size={16} className="feature-icon" /><span>Business, pricing &amp; client skills</span></div>
                <div className="feature-item"><CheckCircle size={16} className="feature-icon" /><span>Certificate &amp; ongoing mentorship</span></div>
              </div>
              <div className="hero-actions training-actions">
                <a href="https://wa.me/919760977091?text=Hi%20Ilma%2C%20I%27d%20like%20to%20enroll%20in%20the%20Mehndi%20training%20program." target="_blank" rel="noreferrer" className="btn-solid">Enroll Now</a>
                <a href="#contact" className="btn-outline">Ask a Question</a>
              </div>
            </Reveal>
            <RevealGroup className="training-cards" stagger={0.1}>
              <RevealItem className="training-card">
                <div className="why-icon-box"><GraduationCap size={22} /></div>
                <h3 className="why-title">Foundation Course</h3>
                <p className="why-desc">Master strokes, motifs, and confident linework from the very first session.</p>
              </RevealItem>
              <RevealItem className="training-card">
                <div className="why-icon-box"><Star size={22} /></div>
                <h3 className="why-title">Advanced Bridal</h3>
                <p className="why-desc">Full bridal hand-and-feet artistry, balance, and signature concept work.</p>
              </RevealItem>
              <RevealItem className="training-card">
                <div className="why-icon-box"><Users size={22} /></div>
                <h3 className="why-title">Artist Mentorship</h3>
                <p className="why-desc">Personal coaching on portfolio, branding, and growing your henna business.</p>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* Student Success */}
        <section className="success-section">
          <Reveal className="section-header">
            <div className="section-label">Student Success</div>
            <h2 className="section-title">Artists Trained, Careers Launched</h2>
            <p className="section-subtitle">Hundreds of students have turned a passion for henna into a profession through Ilma's mentorship.</p>
          </Reveal>
          <RevealGroup className="success-grid" stagger={0.12}>
            <RevealItem className="success-card">
              <div className="success-stars"><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /></div>
              <p className="success-quote">“I joined as a complete beginner and now take my own bridal bookings. Ilma's concept-based method completely changed how I design.”</p>
              <div className="success-author">— Sana, Bridal Mehndi Artist</div>
            </RevealItem>
            <RevealItem className="success-card">
              <div className="success-stars"><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /></div>
              <p className="success-quote">“The mentorship went beyond technique — pricing, clients, branding. I finally treat my henna work like a real business.”</p>
              <div className="success-author">— Ayesha, Freelance Henna Artist</div>
            </RevealItem>
            <RevealItem className="success-card">
              <div className="success-stars"><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /></div>
              <p className="success-quote">“Her attention to detail is unreal. The advanced bridal course gave me the confidence to take on the biggest weddings of my career.”</p>
              <div className="success-author">— Fatima, Studio Owner</div>
            </RevealItem>
          </RevealGroup>
        </section>

        {/* Dedicated Contact Section */}
        <section id="contact" className="contact-section">
          <Reveal className="contact-inner">
            <div className="section-label light-label">Get In Touch</div>
            <h2 className="contact-title">Book Your Mehndi or Training Session</h2>
            <p className="contact-text">
              Bridal bookings, custom designs, festival appointments, or training enquiries — reach out directly
              and Ilma will personally help plan your perfect Mehndi experience.
            </p>
            <div className="contact-actions">
              <a href="tel:+919760977091" className="contact-btn contact-btn-call">
                <Phone size={18} />
                <span>Call Now</span>
              </a>
              <a href="https://wa.me/919760977091?text=Hi%20Ilma%2C%20I%27d%20like%20to%20book%20a%20Mehndi%20session." target="_blank" rel="noreferrer" className="contact-btn contact-btn-wa">
                <MessageCircle size={18} />
                <span>WhatsApp Now</span>
              </a>
            </div>
            <div className="contact-meta">
              <a href="mailto:ilmamultani913@gmail.com" className="contact-meta-item">
                <Mail size={15} /><span>ilmamultani913@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/mehndi_creation7/" target="_blank" rel="noreferrer" className="contact-meta-item">
                <Instagram size={15} /><span>@mehndi_creation7</span>
              </a>
              <div className="contact-meta-item">
                <MapPin size={15} /><span>Nagina, Bijnor, Uttar Pradesh, India</span>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Footer & Booking Info */}
        <footer id="booking" className="site-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="nav-logo">
                <span className="logo-text-mehandi">Mehndi</span>
                <span className="logo-text-creation">Creation</span>
              </div>
              <p>Ilma Multani — Professional Mehndi Artist &amp; Educator. Bridal Mehndi • Professional Training • International Workshops • Concept-Based Henna Art.</p>
              <div className="location-badge">
                <MapPin size={14} className="gold-icon" />
                <span>Nagina, District Bijnor, Uttar Pradesh, India</span>
              </div>
            </div>

            <div className="footer-links-group">
              <h4>Contact &amp; Bookings</h4>
              <div className="contact-details">
                <a href="tel:+919760977091" className="contact-link">
                  <Phone size={16} />
                  <span>+91 9760977091</span>
                </a>
                <a href="mailto:ilmamultani913@gmail.com" className="contact-link">
                  <Mail size={16} />
                  <span>ilmamultani913@gmail.com</span>
                </a>
                <a href="https://wa.me/919760977091" target="_blank" rel="noreferrer" className="contact-link">
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
                <a href="https://www.instagram.com/mehndi_creation7/" target="_blank" rel="noreferrer" className="contact-link">
                  <Instagram size={16} />
                  <span>@mehndi_creation7</span>
                </a>
                <div className="contact-link">
                  <Calendar size={16} />
                  <span>By Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Mehndi Creation by Ilma Multani. All rights reserved.</p>
            <p className="credit">Bridal Mehndi • Professional Training • Concept-Based Henna Art</p>
          </div>
        </footer>
      </div>

      {/* Styled inline helper classes for the landing page */}
      <style>{`
        .main-website {
          transition: opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1), filter 1.5s ease-out;
          background-color: #FFFDFB;
          color: #36221A;
          min-height: 100vh;
        }
        .website-hidden {
          opacity: 0;
          filter: blur(15px);
          pointer-events: none;
          height: 100vh;
          overflow: hidden;
        }
        .website-visible {
          opacity: 1;
          filter: blur(0);
          pointer-events: auto;
        }

        /* Nav Header */
        .nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 6vw;
          padding-left: 90px; /* Offset to clear the fixed back button */
          border-bottom: 1px solid rgba(75, 47, 37, 0.08);
          background-color: rgba(255, 253, 251, 0.8);
          backdrop-filter: blur(8px);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .logo-text-mehandi {
          color: #4B2F25;
        }
        .logo-text-creation {
          color: #C79A92;
          margin-left: 6px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-toggle {
          display: none;
          background: rgba(255, 253, 251, 0.9);
          border: 1px solid rgba(75, 47, 37, 0.15);
          color: #4B2F25;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .nav-item {
          text-decoration: none;
          color: #6D5146;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .nav-item:hover {
          color: #4B2F25;
        }
        .nav-cta-btn {
          text-decoration: none;
          background-color: #4B2F25;
          color: #FFF5EE;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 10px 24px;
          border-radius: 30px;
          transition: background-color 0.3s;
        }
        .nav-cta-btn:hover {
          background-color: #361f17;
        }

        /* Hero Section */
        .hero-section {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          padding: 8vh 6vw;
          min-height: 75vh;
          gap: 40px;
          background: radial-gradient(circle at 100% 0%, #FFF5EE 0%, transparent 60%);
        }
        .hero-content {
          max-width: 580px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #F8E8DC;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          color: #8C6F62;
          margin-bottom: 24px;
        }
        .gold-icon {
          color: #D4AF37;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 54px;
          font-weight: 800;
          line-height: 1.15;
          color: #4B2F25;
          margin: 0 0 20px 0;
        }
        .accent-text {
          font-style: italic;
          color: #C79A92;
          font-weight: 500;
        }
        .hero-subtitle {
          font-size: 15px;
          line-height: 1.6;
          color: #6D5146;
          margin: 0 0 36px 0;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
        }
        .btn-solid {
          text-decoration: none;
          background-color: #4B2F25;
          color: #FFF5EE;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 16px 36px;
          border-radius: 40px;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 8px 24px rgba(75, 47, 37, 0.12);
        }
        .btn-solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(75, 47, 37, 0.18);
        }
        .btn-outline {
          text-decoration: none;
          border: 1px solid rgba(75, 47, 37, 0.25);
          color: #4B2F25;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 16px 36px;
          border-radius: 40px;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .btn-outline:hover {
          background-color: rgba(75, 47, 37, 0.03);
          border-color: #4B2F25;
        }

        /* Hero Visual */
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .visual-card {
          background-color: #FFFDFB;
          border: 1px solid rgba(75, 47, 37, 0.08);
          border-radius: 24px;
          padding: 16px;
          width: 85%;
          max-width: 380px;
          box-shadow: 0 20px 50px rgba(75, 47, 37, 0.06);
        }
        .visual-image-placeholder {
          background-color: #F8E8DC;
          border-radius: 16px;
          height: 380px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .mandala-sketch {
          width: 280px;
          height: 280px;
          opacity: 0.12;
          background-image: radial-gradient(circle, transparent 20%, #4B2F25 20%, #4B2F25 21%, transparent 21%),
                            radial-gradient(circle, transparent 40%, #4B2F25 40%, #4B2F25 42%, transparent 42%),
                            radial-gradient(circle, transparent 60%, #4B2F25 60%, #4B2F25 63%, transparent 63%);
          background-size: 100% 100%;
          border: 1px dashed rgba(75, 47, 37, 0.5);
          border-radius: 50%;
          animation: spin-mandala 60s linear infinite;
        }
        @keyframes spin-mandala {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .artist-info-card {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding: 8px 4px;
        }
        .artist-avatar {
          width: 42px;
          height: 42px;
          background-color: #4B2F25;
          color: #FFF5EE;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 14px;
        }
        .artist-name {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #4B2F25;
        }
        .artist-title {
          margin: 0;
          font-size: 11px;
          color: #8C6F62;
        }

        .hero-subtitle-secondary {
          font-size: 13px;
          opacity: 0.82;
          margin-top: -14px;
        }

        /* Quick Statistics bar */
        .stats-bar {
          padding: 38px 6vw;
          background-color: #FBF7F4;
          border-top: 1px solid rgba(75, 47, 37, 0.06);
          border-bottom: 1px solid rgba(75, 47, 37, 0.06);
          text-align: center;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: #4B2F25;
          line-height: 1;
        }
        .stat-label {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #8C6F62;
        }

        /* About Section */
        .about-section {
          padding: 120px 6vw;
          background-color: #FBF7F4;
          border-top: 1px solid rgba(75, 47, 37, 0.04);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-weight: 700;
          color: #C79A92;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 700;
          color: #4B2F25;
          margin: 0 0 24px 0;
        }
        .about-text p {
          font-size: 14px;
          line-height: 1.7;
          color: #6D5146;
          margin-bottom: 20px;
        }
        .features-list {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: #4B2F25;
          font-weight: 500;
        }
        .feature-icon {
          color: #C79A92;
        }
        .about-media {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .media-ring {
          position: absolute;
          width: 320px;
          height: 320px;
          border: 1px solid rgba(199, 154, 146, 0.2);
          border-radius: 50%;
          animation: spin-mandala 40s linear infinite reverse;
        }
        .media-box {
          width: 280px;
          height: 380px;
          background-color: #4B2F25;
          border-radius: 20px;
          position: relative;
          z-index: 2;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .signature-glow {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 140%;
          height: 140%;
          background: radial-gradient(circle, rgba(199, 154, 146, 0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .media-caption {
          color: #FFF5EE;
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-style: italic;
          opacity: 0.8;
          z-index: 3;
          border-left: 2px solid #C79A92;
          padding-left: 12px;
        }

        /* Gallery / Her Work Section */
        .gallery-section {
          padding: 120px 6vw 140px 6vw;
          background-color: #FBF7F4;
          border-top: 1px solid rgba(75, 47, 37, 0.04);
          overflow: hidden;
        }
        .gallery-reveal {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 360px;
          margin-top: 20px;
        }
        /* Mobile swipe gallery (hidden on desktop) */
        .gallery-mobile { display: none; }
        .gallery-swipe-hint { display: none; }

        /* Services Section */
        .services-section {
          padding: 120px 6vw;
          background-color: #FFFDFB;
        }
        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 60px auto;
        }
        .section-subtitle {
          font-size: 14px;
          color: #6D5146;
          margin-top: -10px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .service-card {
          background-color: #FFFDFB;
          border: 1px solid rgba(75, 47, 37, 0.08);
          border-radius: 20px;
          padding: 36px;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
        }
        .service-card:hover {
          transform: translateY(-8px);
          border-color: #C79A92;
          box-shadow: 0 20px 40px rgba(75, 47, 37, 0.05);
        }
        .service-icon-box {
          width: 50px;
          height: 50px;
          background-color: #F8E8DC;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4B2F25;
          margin-bottom: 24px;
        }
        .service-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #4B2F25;
          margin: 0 0 16px 0;
        }
        .service-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #6D5146;
          margin: 0 0 24px 0;
          flex-grow: 1;
        }
        .service-price {
          font-size: 14px;
          font-weight: 700;
          color: #C79A92;
          letter-spacing: 1px;
        }

        /* Footer */
        .site-footer {
          background-color: #2D1A13;
          color: #E8DCD5;
          padding: 80px 6vw 40px 6vw;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          margin-bottom: 60px;
        }
        .footer-brand p {
          font-size: 14px;
          opacity: 0.75;
          max-width: 320px;
          line-height: 1.6;
          margin: 16px 0 24px 0;
        }
        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #FFF5EE;
          opacity: 0.9;
        }
        .footer-links-group h4 {
          font-family: 'Playfair Display', serif;
          color: #FFF5EE;
          font-size: 16px;
          margin: 0 0 24px 0;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-link {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #E8DCD5;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.3s;
        }
        .contact-link:hover {
          color: #C79A92;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 30px;
          font-size: 12px;
          opacity: 0.6;
        }
        .footer-bottom p {
          margin: 0;
        }

        /* Why Choose Ilma */
        .why-section {
          padding: 120px 6vw;
          background-color: #FFFDFB;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .why-card {
          background-color: #FFFDFB;
          border: 1px solid rgba(75, 47, 37, 0.08);
          border-radius: 18px;
          padding: 30px 26px;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s, box-shadow 0.4s;
        }
        .why-card:hover {
          transform: translateY(-6px);
          border-color: #C79A92;
          box-shadow: 0 18px 36px rgba(75, 47, 37, 0.06);
        }
        .why-icon-box {
          width: 46px;
          height: 46px;
          background-color: #F8E8DC;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4B2F25;
          margin-bottom: 18px;
        }
        .why-title {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #4B2F25;
          margin: 0 0 10px 0;
        }
        .why-desc {
          font-size: 12.5px;
          line-height: 1.6;
          color: #6D5146;
          margin: 0;
        }

        /* Signature Approach band */
        .signature-section {
          padding: 110px 6vw;
          background:
            radial-gradient(circle at 0% 0%, rgba(199, 154, 146, 0.12) 0%, transparent 45%),
            #2D1A13;
          color: #F1E7E0;
        }
        .signature-inner {
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }
        .light-label { color: #C79A92; }
        .signature-title {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 700;
          color: #FFF5EE;
          margin: 0 0 22px 0;
          line-height: 1.2;
        }
        .signature-text {
          font-size: 15px;
          line-height: 1.8;
          color: #D9CAC1;
          margin: 0 auto 30px auto;
          max-width: 720px;
        }
        .signature-points {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px 28px;
        }
        .signature-point {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: #FFF5EE;
          font-weight: 500;
        }

        /* Training & Courses */
        .training-section {
          padding: 120px 6vw;
          background-color: #FBF7F4;
        }
        .training-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 60px;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .training-lead {
          font-size: 14.5px;
          line-height: 1.7;
          color: #6D5146;
          margin: 16px 0 26px 0;
        }
        .training-points {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
        }
        .training-actions { flex-wrap: wrap; }
        .training-cards {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .training-card {
          background-color: #FFFDFB;
          border: 1px solid rgba(75, 47, 37, 0.08);
          border-radius: 16px;
          padding: 24px 26px;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s, box-shadow 0.4s;
        }
        .training-card:hover {
          transform: translateX(6px);
          border-color: #C79A92;
          box-shadow: 0 16px 30px rgba(75, 47, 37, 0.06);
        }

        /* Student Success */
        .success-section {
          padding: 120px 6vw;
          background-color: #FFFDFB;
        }
        .success-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .success-card {
          background-color: #FBF7F4;
          border: 1px solid rgba(75, 47, 37, 0.06);
          border-radius: 18px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .success-stars {
          display: flex;
          gap: 4px;
          color: #D4AF37;
        }
        .success-quote {
          font-size: 14px;
          line-height: 1.7;
          color: #4B2F25;
          font-style: italic;
          margin: 0;
        }
        .success-author {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #C79A92;
          margin-top: auto;
        }

        /* Dedicated Contact Section */
        .contact-section {
          padding: 120px 6vw;
          background:
            radial-gradient(circle at 100% 100%, #FFF5EE 0%, transparent 55%),
            #FBF7F4;
          border-top: 1px solid rgba(75, 47, 37, 0.04);
        }
        .contact-inner {
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 700;
          color: #4B2F25;
          margin: 0 0 18px 0;
          line-height: 1.2;
        }
        .contact-text {
          font-size: 15px;
          line-height: 1.7;
          color: #6D5146;
          margin: 0 auto 32px auto;
          max-width: 600px;
        }
        .contact-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 16px 32px;
          border-radius: 40px;
          transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
        }
        .contact-btn-call {
          background-color: #4B2F25;
          color: #FFF5EE;
          box-shadow: 0 8px 24px rgba(75, 47, 37, 0.14);
        }
        .contact-btn-call:hover { transform: translateY(-2px); background-color: #361f17; }
        .contact-btn-wa {
          background-color: #1EBE5D;
          color: #FFFFFF;
          box-shadow: 0 8px 24px rgba(30, 190, 93, 0.22);
        }
        .contact-btn-wa:hover { transform: translateY(-2px); background-color: #17a350; }
        .contact-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px 28px;
        }
        .contact-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6D5146;
          text-decoration: none;
          transition: color 0.3s;
        }
        a.contact-meta-item:hover { color: #4B2F25; }

        /* Responsive styles */
        @media (max-width: 992px) {
          .hero-section {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 8vh 6vw;
          }
          .hero-content {
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-actions {
            justify-content: center;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .services-grid {
            grid-template-columns: 1fr;
          }
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .training-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .success-grid {
            grid-template-columns: 1fr;
            max-width: 560px;
          }
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Fixed Upper Left Back Arrow Button */
        .back-to-intro-btn {
          position: fixed;
          top: 24px;
          left: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(255, 253, 251, 0.95);
          border: 1px solid rgba(75, 47, 37, 0.15);
          color: #4B2F25;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 101;
          box-shadow: 0 4px 12px rgba(75, 47, 37, 0.08);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .back-to-intro-btn:hover {
          background-color: #4B2F25;
          color: #FFF5EE;
          border-color: #4B2F25;
          transform: translateX(-3px);
          box-shadow: 0 8px 20px rgba(75, 47, 37, 0.15);
        }
        @media (max-width: 768px) {
          .back-to-intro-btn {
            top: 14px;
            left: 14px;
            width: 36px;
            height: 36px;
          }

          /* Mobile navigation — collapse links into a toggle menu */
          .nav-header {
            padding: 14px 5vw;
            padding-left: 62px;
          }
          .nav-logo { font-size: 19px; }
          .nav-toggle { display: inline-flex; }
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            background-color: #FFFDFB;
            border-top: 1px solid rgba(75, 47, 37, 0.08);
            border-bottom: 1px solid rgba(75, 47, 37, 0.08);
            padding: 4px 5vw 18px 5vw;
            box-shadow: 0 16px 30px rgba(75, 47, 37, 0.10);
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .nav-links.nav-open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
          .nav-item {
            padding: 15px 2px;
            font-size: 13px;
            border-bottom: 1px solid rgba(75, 47, 37, 0.06);
          }
          .nav-cta-btn {
            margin-top: 16px;
            text-align: center;
            padding: 14px 24px;
            font-size: 12px;
          }

          /* Typography & spacing */
          .hero-section { padding: 6vh 6vw 8vh; min-height: auto; gap: 28px; }
          .hero-title { font-size: 38px; }
          .hero-subtitle { font-size: 14px; }
          .hero-actions { flex-wrap: wrap; gap: 12px; }
          .section-title { font-size: 28px; }
          .section-label { font-size: 10px; letter-spacing: 2px; }
          .section-header { margin-bottom: 40px; }
          .stats-bar { padding: 32px 6vw; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; }
          .stat-value { font-size: 26px; }
          .about-section { padding: 70px 6vw; }
          .about-grid { gap: 44px; }
          .services-section { padding: 70px 6vw; }
          .why-section { padding: 70px 6vw; }
          .why-grid { grid-template-columns: 1fr; gap: 16px; }
          .signature-section { padding: 70px 6vw; }
          .signature-title { font-size: 26px; }
          .training-section { padding: 70px 6vw; }
          .success-section { padding: 70px 6vw; }
          .contact-section { padding: 70px 6vw; }
          .contact-title { font-size: 26px; }
          .contact-actions { flex-direction: column; align-items: stretch; }
          .contact-btn { justify-content: center; }
          .gallery-section { padding: 70px 6vw 80px; }
          .gallery-reveal { display: none; }
          .gallery-mobile {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding: 8px 6vw 6px 6vw;
            margin: 16px -6vw 0 -6vw;
            scrollbar-width: none;
          }
          .gallery-mobile::-webkit-scrollbar { display: none; }
          .gm-card {
            flex: 0 0 80%;
            scroll-snap-align: center;
            border-radius: 18px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 14px 30px rgba(75, 47, 37, 0.18);
          }
          .gm-card img {
            display: block;
            width: 100%;
            height: 320px;
            object-fit: cover;
          }
          .gallery-swipe-hint {
            display: block;
            text-align: center;
            margin-top: 14px;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #C79A92;
            font-weight: 600;
          }
          .site-footer { padding: 60px 6vw 32px; }
          .footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
          .visual-card { width: 100%; max-width: 340px; }
          .media-box { width: 240px; height: 320px; }
          .media-ring { width: 270px; height: 270px; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 31px; }
          .hero-subtitle { font-size: 13.5px; }
          .section-title { font-size: 24px; }
          .service-card { padding: 26px; }
          .nav-logo { font-size: 17px; }
          .btn-solid, .btn-outline { padding: 14px 26px; font-size: 11px; }
        }
      `}</style>
    </>
  );
}

export default App;
