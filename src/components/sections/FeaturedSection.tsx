import React, { useEffect, useRef } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { featuredSushi } from '../../data/homeData';
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper';

// Add custom styles for the enhanced section
const swiperStyles = {
  swiperContainer: {
    padding: '50px 0',
  },
  slide: {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transformStyle: 'preserve-3d' as 'preserve-3d',
  },
  activeSlide: {
    transform: 'scale(1.05)',
    zIndex: 1,
  }
};



const FeaturedSection: React.FC = () => {
  const { addToCart } = useCart();
  
  // Filter only popular dishes
  const popularDishes = featuredSushi.filter(item => item.isPopular);
  
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

    if (containerRef.current)  observer.observe(containerRef.current);
    

    return () => {
      if (containerRef.current)  observer.unobserve(containerRef.current);
      
    };
  }, []);

  
  return (
    <section 
      className="snap-section py-5  text-light" 
      id="featured" 
      aria-label="Featured sushi dishes"
      style={{ 
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" 
        style={{

          opacity: 0.15,
          zIndex: 0
        }}
      />
      
      <Container className="position-relative" style={{ zIndex: 1 }} fluid>
        
        <div className="text-center mt-2">
          <div className="luxury-header-container" ref={containerRef}>
            <div className="luxury-header-line luxury-header-line-left"></div>
            <h2 className="luxury-header text-gold" style={{fontSize: 'clamp(1.75rem, 6vw, 3.5rem)'}}>
            Popular Dishes
              <span className="luxury-subtext">鮨物語</span>
            </h2>
            <div className="luxury-header-line luxury-header-line-right"></div>
            <div className="luxury-glow-overlay"></div>
          </div>
        </div>
        
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          style={swiperStyles.swiperContainer}
        >
          {popularDishes.map((item) => (
            <SwiperSlide 
              key={item.id}
              style={{ 
                width: '340px', 
                height: '450px',
              }}
            >
              <Card 
                className="h-100 shadow-lg border-0 bg-dark text-light overflow-hidden" 
                style={{
                  borderRadius: '15px',
                  background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                }}
              >
                <div className="position-absolute top-0 start-0 end-0" style={{ height: '5px', background: 'linear-gradient(90deg, #ffd700, #ffec80, #ffd700)' }} />
                <div className="overflow-hidden" style={{ height: "220px" }}>
                  <Card.Img 
                    variant="top" 
                    src={item.image} 
                    alt={`${item.name} sushi dish`}
                    loading="lazy"
                    className="h-100 w-100"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="fs-4 fw-bold text-white">{item.name}</Card.Title>
                    <span className="badge bg-gradient py-2 px-3 rounded-pill" style={{ background: 'linear-gradient(90deg, #9f7928, #ffd700)', color: '#000' }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="mb-2">
                    <small className="text-light">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {item.ratings} ({item.reviewCount} reviews)
                    </small>
                  </div>
                  <Card.Text className="text-secondary flex-grow-1">{item.description}</Card.Text>
                  <div className="mt-2 mb-3">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="badge me-2 mb-1" style={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)', 
                        color: '#e0e0e0',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '30px',
                        border: '1px solid rgba(255, 215, 0, 0.3)'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    style={{
                      background: 'linear-gradient(90deg, #9f7928, #ffd700, #9f7928)',
                      border: 'none',
                      color: '#000',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                    }}
                    className="w-100 py-2"
                    onClick={() => addToCart(item)}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="text-center mt-5">
          <Link to="/menu">
            <Button 
              variant="outline-dark" 
              size="lg" 
              aria-label="View full menu"
              className="px-4 py-2"
              style={{
                borderColor: '#ffd700',
                color: '#ffd700',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
              }}
            >
              Explore Full Menu
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedSection; 