import React, { useEffect, useRef } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
// Import required modules
import { Pagination, Autoplay, EffectCards } from 'swiper';
import { testimonials } from '../../data/homeData';
import '../../styles/TestimonialsSection.css';

interface TestimonialsSectionProps {
  scrollToSection: (index: number) => void;
  mediaIndex: number;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ scrollToSection, mediaIndex }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Add fade-in animation when section comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Render star ratings more accessibly
  const renderStars = (rating: number) => {
    return (
      <div className="star-rating" aria-label={`Rating: ${rating} out of 5 stars`}>
        {Array(5).fill(0).map((_, index) => (
          <span 
            key={index} 
            className={`star ${index < rating ? 'filled' : 'empty'}`}
            aria-hidden="true"
          >
            {index < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const containerRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        },
        { threshold: 0.3 } // Trigger when 30% of the element is visible
      );
  
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
  
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, []);

  return (
    <section 
      ref={sectionRef}
      className="snap-section testimonials-section py-5" 
      id="testimonials"
     
      aria-label="Customer testimonials section"
    >
      
      <Container className="position-relative " style={{ zIndex: 1 }}  fluid>
      <div className="text-center mb-5">
          <div className="luxury-header-container" ref={containerRef}>
            <div className="luxury-header-line luxury-header-line-left"></div>
            <h2 className="luxury-header text-gold" style={{fontSize: 'clamp(1.75rem, 6vw, 3.5rem)'}}>
            Reviews
              <span className="luxury-subtext">鮨物語</span>
            </h2>
            <div className="luxury-header-line luxury-header-line-right"></div>
            <div className="luxury-glow-overlay"></div>
          </div>
        </div>
        
        <div className="testimonial-slider" >
          <Swiper
            slidesPerView={1}
            effect={"cards"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[EffectCards, Pagination, Autoplay]}
            className="testimonial-swiper"
            
          >
            {testimonials.map(testimonial => (
              <SwiperSlide key={testimonial.id}>
                <Card className="testimonial-card border-0 shadow">
                  <Card.Body className="text-center p-5">
                    <div className="testimonial-avatar mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name}`} 
                        className="rounded-circle border border-3 border-primary" 
                        width="100" 
                        height="100"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                    <Card.Text className="mb-4 testimonial-quote">"{testimonial.comment}"</Card.Text>
                    <div className="mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <Card.Title as="h4" className="testimonial-name">{testimonial.name}</Card.Title>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection; 