import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AwardsSection } from './footer/AwardsSection';
import { BrandSection } from './footer/BrandSection';
import { HoursSection } from './footer/HoursSection';
import { NewsletterSection } from './footer/NewsletterSection';
import { InfoSection } from './footer/InfoSection';
import { FooterBottom } from './footer/FooterBottom';
import { ScrollToTop } from './footer/ScrollToTop';
import { ContactInfo } from '../types/footer';
import {
  AWARDS,
  BUSINESS_HOURS,
  SOCIAL_MEDIA,
  APP_DOWNLOADS,
  LANGUAGES,
  LEGAL_LINKS
} from '../constants/footerConstants';

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [language, setLanguage] = useState('English');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateElements(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
      return () => observer.unobserve(footerElement);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  const contactInfo: ContactInfo = {
    address: '123 Sushi Street, Tokyo, Japan',
    phone: '+1 (555) 123-4567',
    email: 'info@yusensu.com'
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer-snap-section" id="footer">
      <footer className="footer-container">
        <Container fluid className="d-flex flex-column min-vh-100">
          <Row className="align-items-center text-md-start justify-content-evenly">
            <AwardsSection awards={AWARDS} />
          </Row>

          <Row className="px-3 px-md-5 mt-5 flex-grow-1">
            <Col lg={4} md={6} sm={12} className="mb-4">
              <BrandSection 
                socialMedia={SOCIAL_MEDIA}
                appDownloads={APP_DOWNLOADS}
                animateElements={animateElements}
              />
            </Col>
            
            <Col lg={4} md={6} sm={12} className="mb-4">
              <HoursSection 
                hours={BUSINESS_HOURS}
                languages={LANGUAGES}
                currentLanguage={language}
                onLanguageChange={setLanguage}
                animateElements={animateElements}
              />
            </Col>

            <Col lg={4} md={12} sm={12} className="mb-4">
              <NewsletterSection 
                contactInfo={contactInfo}
                email={email}
                isSubscribed={isSubscribed}
                onEmailChange={(e) => setEmail(e.target.value)}
                onSubscribe={handleSubscribe}
                animateElements={animateElements}
              />
            </Col>
            
          </Row>
          
       
           
          <FooterBottom links={LEGAL_LINKS} />
           
          <ScrollToTop visible={showScrollTop} onClick={scrollToTop} />
                <InfoSection animateElements={animateElements} />
        </Container>
      </footer>
    </div>
  );
};

export default Footer;