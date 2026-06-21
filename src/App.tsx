import { useState } from 'react';
import { Preloader } from './components/Preloader';
import './styles/preloader.css';
import { VideoScrollHero } from './components/ui/video-scroll-hero';
import ImageReveal from './components/ui/image-tiles';
import { Heart, Sparkles, MapPin, Mail, Calendar, CheckCircle, ArrowLeft, Menu, X } from 'lucide-react';

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
            <span className="logo-text-mehandi">Mehandi</span>
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
            <a href="#booking" className="nav-item" onClick={() => setMenuOpen(false)}>Book Appointment</a>
            <a href="#booking" className="nav-cta-btn" onClick={() => setMenuOpen(false)}>Book Now</a>
          </nav>
        </header>

        {/* Cinematic scroll-to-scale video hero */}
        <VideoScrollHero videoSrc="/hello.mp4" />

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="badge">
              <Sparkles size={12} className="gold-icon" />
              <span>Certified Bridal Mehandi Artist</span>
            </div>
            <h1 className="hero-title">
              Crafting Timeless <br />
              <span className="accent-text">Henna Masterpieces</span>
            </h1>
            <p className="hero-subtitle">
              Specializing in bespoke luxury bridal designs, intricate traditional motifs, and modern contemporary geometry. Handcrafted with organic, premium dark-staining henna.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="btn-solid">Schedule Consultation</a>
              <a href="#gallery" className="btn-outline">Explore Gallery</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-image-placeholder">
                <div className="mandala-sketch"></div>
              </div>
              <div className="artist-info-card">
                <div className="artist-avatar">IM</div>
                <div>
                  <h4 className="artist-name">Ilma Multani</h4>
                  <p className="artist-title">Lead Mehandi Designer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-label">The Artist</div>
              <h2 className="section-title">Meet Ilma Multani</h2>
              <p>
                With over a decade of dedicated craftsmanship, certified artist Ilma Multani brings a unique fusion of traditional Indian, Arabic, and contemporary geometric patterns to life.
              </p>
              <p>
                Each design is created freehand, drawing inspiration from ancient heritage, bridal stories, and modern couture. We utilize 100% natural, chemical-free henna paste made from selected triple-sifted henna leaves, pure essential oils, and eucalyptus.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>Bespoke Bridal Customizations</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>Deep Reddish-Brown Natural Stains</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>International Destination Bookings</span>
                </div>
              </div>
            </div>
            <div className="about-media">
              <div className="media-ring"></div>
              <div className="media-box">
                <div className="signature-glow"></div>
                <div className="media-caption">Ilma Multani Signature Mark</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery / Her Work Section */}
        <section id="gallery" className="gallery-section">
          <div className="section-header">
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">Her Work</h2>
            <p className="section-subtitle">A glimpse of intricate bridal &amp; festive henna artistry.</p>
          </div>
          <div className="gallery-reveal">
            <ImageReveal
              leftImage="https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=600&q=80&auto=format&fit=crop"
              middleImage="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=600&q=80&auto=format&fit=crop"
              rightImage="https://images.unsplash.com/photo-1602910344008-22f323cc1817?w=600&q=80&auto=format&fit=crop"
            />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="section-header">
            <div className="section-label">Bespoke Offerings</div>
            <h2 className="section-title">Luxury Packages</h2>
            <p className="section-subtitle">Tailored for weddings, celebrations, and private design sessions.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-box">
                <Heart size={24} className="service-icon" />
              </div>
              <h3 className="service-name">Royal Bridal Package</h3>
              <p className="service-desc">
                Extremely intricate, dense, full-arm and full-leg bridal patterns incorporating customized love stories, wedding portraits, and royal mandalas. Includes a post-application care kit.
              </p>
              <div className="service-price">From $450</div>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <Sparkles size={24} className="service-icon" />
              </div>
              <h3 className="service-name">Classic Indo-Arabic</h3>
              <p className="service-desc">
                An elegant combination of bold Arabic flows and delicate Indian filler patterns. Ideal for bridesmaids, family members, baby showers, or festive celebrations.
              </p>
              <div className="service-price">From $200</div>
            </div>

            <div className="service-card">
              <div className="service-icon-box">
                <MapPin size={24} className="service-icon" />
              </div>
              <h3 className="service-name">Contemporary Geometric</h3>
              <p className="service-desc">
                Modern minimalist henna art focusing on clean symmetry, mandalas, negative space, and bracelet-style wrist bands. Perfect for the modern chic bride.
              </p>
              <div className="service-price">From $250</div>
            </div>
          </div>
        </section>

        {/* Footer & Booking Info */}
        <footer id="booking" className="site-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="nav-logo">
                <span className="logo-text-mehandi">Mehandi</span>
                <span className="logo-text-creation">Creation</span>
              </div>
              <p>Bespoke luxury henna artistry by certified designer Ilma Multani.</p>
              <div className="location-badge">
                <MapPin size={14} className="gold-icon" />
                <span>Mumbai • Dubai • Destination Weddings Globally</span>
              </div>
            </div>

            <div className="footer-links-group">
              <h4>Contact & Bookings</h4>
              <div className="contact-details">
                <a href="mailto:ilma@mehandicreation.com" className="contact-link">
                  <Mail size={16} />
                  <span>ilma@mehandicreation.com</span>
                </a>
                <a href="https://instagram.com/mehandi_creation" target="_blank" rel="noreferrer" className="contact-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span>@mehandi_creation</span>
                </a>
                <div className="contact-link">
                  <Calendar size={16} />
                  <span>Mon - Sun: By Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Mehandi Creation by Ilma Multani. All rights reserved.</p>
            <p className="credit">Designed with luxury cinematic experiences.</p>
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
          .about-section { padding: 70px 6vw; }
          .about-grid { gap: 44px; }
          .services-section { padding: 70px 6vw; }
          .gallery-section { padding: 70px 6vw 90px; }
          .gallery-reveal { min-height: 300px; }
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
