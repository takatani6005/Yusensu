import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  scrollToSection: (index: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section 
      className="snap-section hero-section" 
      style={{ backgroundImage: 'url(https://source.unsplash.com/fsI-_MRsic0/1920x1080)' }}
      id="hero"
      aria-label="Hero section"
    >
     
      <div className="hero-overlay" aria-hidden="true"></div>
      <div className="hero-content">
        <h1 className="display-3 fw-bold mb-4">Experience Authentic Japanese Sushi</h1>
        <p className="lead mb-4">Crafted with tradition, served with passion.</p>
        <Link to="/menu">
          <button className="hero-btn" aria-label="View Menu">View Menu</button>
        </Link>
      </div>
      
     
    </section>
  );
};

export default HeroSection; 