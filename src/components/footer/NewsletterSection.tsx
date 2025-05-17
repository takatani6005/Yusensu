import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../../styles/newsletter.css';
import { ContactInfo } from '../../types/footer';

interface NewsletterSectionProps {
  contactInfo: ContactInfo;
  email: string;
  isSubscribed: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubscribe: (e: React.FormEvent) => void;
  animateElements: boolean;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  contactInfo,
  email,
  isSubscribed,
  onEmailChange,
  onSubscribe,
  animateElements
}) => (
  <Card className={`footer-card h-100 `} style={{ animationDelay: '0.4s' }}>
    <Card.Body>
      <h5 className="footer-heading">Newsletter</h5>
      <p className="mb-3">Subscribe for exclusive offers and updates</p>
      <Form className="footer-newsletter" onSubmit={onSubscribe}>
        <Form.Group className="mb-3 newsletter-form-group">
          <Form.Control 
            type="email" 
            placeholder="Your email address" 
            className="newsletter-input"
            value={email}
            onChange={onEmailChange}
            required
          />
          <Button 
            type="submit" 
            className={`newsletter-button ${isSubscribed ? 'subscribed' : ''}`}
            disabled={isSubscribed}
          >
            {isSubscribed ? 'Thank you!' : <>Subscribe <FontAwesomeIcon icon={faArrowRight} className="ms-2" /></>}
          </Button>
        </Form.Group>      </Form>
      <Form.Group className="privacy-agreement mt-3">
        <div className="custom-checkbox-wrapper">
          <Form.Check
            type="checkbox"
            id="privacy-checkbox"
            required
            className="custom-checkbox gold-accent"
            label={
              <span className="privacy-text">
                I consent to receive exclusive invitations and curated content.{' '}
                <a 
                  href="/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="privacy-link"
                >
                  Privacy Policy
                </a>
              </span>
            }
          />
        </div>
      </Form.Group>
      <div className="contact-info mt-4">
        <h6 className="mb-3">Contact Us</h6>
        <div className="contact-item hover-effect">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
          <span>{contactInfo.address}</span>
        </div>
        <div className="contact-item hover-effect">
          <FontAwesomeIcon icon={faPhone} className="contact-icon" />
          <span>{contactInfo.phone}</span>
        </div>
        <div className="contact-item hover-effect">
          <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          <span>{contactInfo.email}</span>
        </div>
      </div>
    </Card.Body>
  </Card>
);
