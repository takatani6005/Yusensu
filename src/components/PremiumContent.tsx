import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface PremiumContentProps {
  title: string;
  subtitle?: string;
  image: string;
  content: string;
  ctaText?: string;
  ctaLink?: string;
  onClose: () => void;
}

const PremiumContent: React.FC<PremiumContentProps> = ({
  title,
  subtitle,
  image,
  content,
  ctaText = 'Learn More',
  ctaLink = '#',
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Handle closing on ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle scroll down button
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // Match the animation duration
  };

  return (
    <div className={`premium-content-overlay ${isVisible ? 'visible' : ''}`}>
      {/* Close button */}
      <button className="premium-close-btn" onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Hero section */}
      <div 
        className="premium-hero" 
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="premium-hero-overlay"></div>
        <Container className="premium-hero-content">
          <h1 className="premium-title">{title}</h1>
          {subtitle && <p className="premium-subtitle">{subtitle}</p>}
          
          <div className="premium-scroll-indicator" onClick={scrollToContent}>
            <span>Discover</span>
            <FontAwesomeIcon icon={faChevronDown} bounce />
          </div>
        </Container>
      </div>

      {/* Content section */}
      <div className="premium-content-section" ref={contentRef}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <div className="premium-content-wrapper">
                <div className="premium-divider"></div>
                <div className="premium-content">
                  {content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                {ctaLink && (
                  <div className="text-center mt-5">
                    <Button 
                      href={ctaLink}
                      variant="outline-primary" 
                      size="lg" 
                      className="premium-cta"
                    >
                      {ctaText}
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default PremiumContent; 