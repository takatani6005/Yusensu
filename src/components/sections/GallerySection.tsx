import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { galleryImages } from '../../data/homeData';

interface GallerySectionProps {
  scrollToSection: (index: number) => void;
  mediaIndex: number;
}

const GallerySection: React.FC<GallerySectionProps> = ({ scrollToSection, mediaIndex }) => {
  const containerRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)  entry.target.classList.add("in-view");
        },
        { threshold: 0.3 } // Trigger when 30% of the element is visible
      );
  
      if (containerRef.current)  observer.observe(containerRef.current);
      
      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
        
      };
    }, []);
    
  return (
    <section className="snap-section py-5 " id="gallery" aria-label="Sushi gallery section">
      <Container fluid > 
      <div className="text-center mb-5">
          <div className="luxury-header-container" ref={containerRef}>
            <div className="luxury-header-line luxury-header-line-left"></div>
            <h2 className="luxury-header text-gold" style={{fontSize: 'clamp(1.75rem, 6vw, 3.5rem)'}}>
            Sushi Gallery
              <span className="luxury-subtext">鮨物語</span>
            </h2>
            <div className="luxury-header-line luxury-header-line-right"></div>
            <div className="luxury-glow-overlay"></div>
          </div>
        </div>
        
        <Row className="g-4 m-lg-5">
          {galleryImages.map((image, index) => (
            <Col key={index} xs={6} md={4}>
              <div className="gallery-item">
                <img 
                  src={image} 
                  alt={`Sushi presentation ${index + 1}`} 
                  className="img-fluid rounded shadow"
                  style={{ objectFit: 'cover', height: '200px', width: '100%' }}
                  loading="lazy"
                  width="100%"
                  height="200"
                />
              </div>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <Button 
            variant="outline-dark" 
            size="lg" 
            onClick={() => scrollToSection(mediaIndex)}
            aria-label="View more sushi gallery images"
          >
            View More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default GallerySection; 