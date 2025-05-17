import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faMapMarkerAlt, 
  faPhone, 
  faMailBulk, 
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

interface InfoSectionProps {
  variants: any;
  forwardedRef: React.RefObject<HTMLDivElement>;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ variants, forwardedRef }) => {
  return (
    <motion.div variants={variants} ref={forwardedRef} className="h-100">
      <div 
        className="p-md-4 p-3 rounded shadow h-100 d-flex flex-column"
        style={{
          borderRadius: '15px',
          background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.9), rgba(42, 42, 42, 0.9))',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h4 className="text-gold mb-4 pb-2 border-bottom fs-md-4 fs-5" 
          style={{ borderColor: 'rgba(255, 215, 0, 0.2)' }}
        >
          Reservation Information
        </h4>
        
        {/* Opening Hours */}
        <div className="mb-4">
          <h5 className="text-light d-flex align-items-center fs-md-5 fs-6">
            <FontAwesomeIcon icon={faClock} className="me-2 text-gold" />
            Opening Hours
          </h5>
          <ul className="list-unstyled text-light">
            <li className="mb-2 d-flex justify-content-between">
              <span>Monday - Friday:</span>
              <span className="text-gold">8:30 AM - 10:00 PM</span>
            </li>
            <li className="mb-2 d-flex justify-content-between">
              <span>Saturday - Sunday:</span>
              <span className="text-gold">10:30 AM - 12:00 PM</span>
            </li>
          </ul>
        </div>
        
        {/* Contact Information */}
        <div className="mb-4">
          <p className="text-light d-flex align-items-start">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-gold mt-1" />
            <span>123 Gourmet Avenue, Culinary District<br />Tokyo, Japan 100-0001</span>
          </p>
          <p className="text-light d-flex align-items-center">
            <FontAwesomeIcon icon={faPhone} className="me-2 text-gold" />
            <span>(555) 123-4567</span>
          </p>
          <p className="text-light d-flex align-items-center">
            <FontAwesomeIcon icon={faMailBulk} className="me-2 text-gold" />
            <span>reservations@yusensu-sushi.com</span>
          </p>
        </div>
        
        {/* Reservation Policy */}
        <div className="mb-4">
          <h5 className="text-light d-flex align-items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="me-2 text-gold" />
            Reservation Policy
          </h5>
          <ul className="text-light small ps-0 styled-list">
            <li className="mb-2">We hold reservations for 15 minutes past the reserved time.</li>
            <li className="mb-2">For parties of 6 or more, please call us directly.</li>
            <li>A credit card is required for groups of 8 or more.</li>
          </ul>
        </div>
        
        {/* Additional Information */}
        <div className="mt-auto">
          <div className="p-3 rounded" style={{ 
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            border: '1px dashed rgba(255, 215, 0, 0.3)',
          }}>
            <p className="small text-light mb-0">
              Reservations made online are <span className="text-gold">confirmed instantly</span> based on availability.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
