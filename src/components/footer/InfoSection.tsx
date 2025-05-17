import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSchool, faCode, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../../styles/InfoSection.css';

interface InfoSectionProps {
  animateElements: boolean;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ animateElements }) => {
  return (
    <Card className={`footer-card mx-5 h-100 mt-5`} 
      style={{ 
        animationDelay: '0.3s',
        background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.9), rgba(42, 42, 42, 0.9))',
        border: '1px solid rgba(255, 215, 0, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
      <Card.Body>
        <h5 className="footer-section-title mb-4 text-gold">Developer Information</h5>
        <div className="developer-info">
          <div className="info-item mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className="text-gold me-3" size="lg" />
            <div>
              <div className="info-label text-light opacity-75">Full Name</div>
              <div className="info-value text-white fw-bold">Trang Sĩ Anh Hào</div>
            </div>
          </div>
          <div className="info-item mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faCode} className="text-gold me-3" size="lg" />
            <div>
              <div className="info-label text-light opacity-75">Student ID</div>
              <div className="info-value text-white">DH52200644</div>
            </div>
          </div>
          <div className="info-item mb-4 d-flex align-items-center">
            <FontAwesomeIcon icon={faSchool} className="text-gold me-3" size="lg" />
            <div>
              <div className="info-label text-light opacity-75">Class</div>
              <div className="info-value text-white">D22_TH14</div>
            </div>
          </div>
         
    
          
        </div>
      </Card.Body>
    </Card>
  );
};