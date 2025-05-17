import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mediaSections } from '../../data/homeData';

const MediaHubSection: React.FC = () => {

  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)  entry.target.classList.add("in-view");
    
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      
    };
  }, []);

  return (
    <section className="snap-section py-5" id="media" aria-label="Media hub section">
      <Container fluid>
      <div className="text-center mb-5">
        <div className="luxury-header-container" ref={containerRef}>
          <div className="luxury-header-line luxury-header-line-left"></div>
          <h2 className="luxury-header text-gold" style={{fontSize: 'clamp(1.75rem, 6vw, 3.5rem)'}}>
            Media Hub
            <span className="luxury-subtext">鮨物語</span>
          </h2>
          <div className="luxury-header-line luxury-header-line-right"></div>
          <div className="luxury-glow-overlay"></div>
        </div>
      </div>
        
        <Row className="g-4 mx-5">
          {mediaSections.map((section) => (
            <Col md={6} key={section.id}>
              <Card className="media-card h-100 border-0 shadow-sm">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={section.image} 
                    alt={`${section.title} section thumbnail`}
                    className="media-card-img"
                    loading="lazy"
                    width="100%"
                    height="250"
                  />
                  <div className="media-overlay" aria-hidden="true"></div>
                  <div className="media-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={section.icon} />
                  </div>
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="h3 mb-3">{section.title}</Card.Title>
                  <Link 
                    to={`/media#${section.id}`} 
                    className="text-decoration-none"
                    aria-label={`Explore ${section.title}`}
                  >
                    <div className="media-link mt-3">
                      Explore <span className="ms-2" aria-hidden="true">&rarr;</span>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        
      </Container>
    </section>
  );
};

export default MediaHubSection; 