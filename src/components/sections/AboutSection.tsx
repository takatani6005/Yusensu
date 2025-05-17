import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RevealContent from '../RevealContent';

const AboutSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = ([entry]) => {
      setIsInView(entry.isIntersecting);
      if (entry.target === containerRef.current && entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    };
  
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.3,
    });
  
    const currentSection = sectionRef.current;
    const currentContainer = containerRef.current;

    if (currentSection) observer.observe(currentSection);
    if (currentContainer) observer.observe(currentContainer);
    
    return () => {
      if (currentSection)   observer.unobserve(currentSection);
      if (currentContainer) observer.unobserve(currentContainer);
      
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="snap-section py-5" 
      id="about" 
      aria-label="About us section"
      style={{ 
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#121212',
        color: '#f5f5f5'
      }}
    >
      <Container fluid>
      <div className="text-center mb-5">
        <div className="luxury-header-container" ref={containerRef}>
          <div className="luxury-header-line luxury-header-line-left"></div>
          <h2 className="luxury-header text-gold" style={{fontSize: 'clamp(1.75rem, 6vw, 3.5rem)'}}>
            OUR STORY
            <span className="luxury-subtext">鮨物語</span>
          </h2>
          <div className="luxury-header-line luxury-header-line-right"></div>
          <div className="luxury-glow-overlay"></div>
        </div>
      </div>

        <Row className="align-items-center g-5 p-5">
          <Col lg={7} className="mb-4 mb-lg-0">
            <RevealContent animation="slide-in-left" delay="delay-200">
              <div className="position-relative" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <img 
                  src="https://placehold.co/600x400" 
                  alt="Chef preparing sushi" 
                  className="img-fluid rounded shadow w-100"
                  loading="lazy"
                  style={{
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    transition: 'transform 0.5s ease',
                    transform: isInView ? 'scale(1)' : 'scale(0.95)',
                    filter: 'contrast(1.1) brightness(0.95)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
                <div 
                  className="position-absolute" 
                  style={{
                    top: isInView ? '15px' : '0px',
                    left: isInView ? '15px' : '0px',
                    right: '-15px',
                    bottom: '-15px',
                    border: '2px solid #ffd700',
                    borderRadius: '4px',
                    zIndex: 0,
                    transition: 'all 0.5s ease 0.2s',
                    opacity: isInView ? 1 : 0,
                    maxWidth: 'calc(100% + 30px)'
                  }}
                ></div>
              </div>
            </RevealContent>
          </Col>
          <Col lg={5}>
            <RevealContent animation="slide-in-right" delay="delay-300">
              <h3 className="luxury-subheader mb-4">Yusensu</h3>
              <p className="lead text-gold">Yusensu was founded by Master Chef Tanaka with a simple mission: to bring authentic Japanese sushi to sushi lovers worldwide.</p>
              <p>
                With over 20 years of experience in traditional Japanese cuisine, our chef carefully selects the freshest ingredients daily to create exceptional sushi that honors tradition while embracing innovation.
              </p>
              <p>
                Every dish at Yusensu tells a story of Japanese culinary craftsmanship - from the perfectly seasoned rice to the expertly sliced fish. We invite you to experience our passion for authentic sushi.
              </p>
              <Link to="/contact">
                <Button 
                  className="luxury-button mt-4" 
                  aria-label="Learn more about us"
                >
                  <span className="button-text">Learn More</span>
                </Button>
              </Link>
            </RevealContent>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;