import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { SocialMedia, AppDownload } from '../../types/footer';

interface BrandSectionProps {
  socialMedia: SocialMedia[];
  appDownloads: AppDownload[];
  animateElements: boolean;
}

export const BrandSection: React.FC<BrandSectionProps> = ({ 
  socialMedia, 
  appDownloads, 
  animateElements 
}) => (
  <Card className={`footer-card h-100`} style={{ animationDelay: '0.1s'}}>
    <Card.Body>
      <div className="footer-brand">
        <h2 className="mb-3">Yusensu</h2>
        <div className="brand-decoration"></div>
      </div>
      <p className="footer-description mb-4">
        Experience authentic Japanese cuisine crafted with tradition and passion. 
        Every dish tells a story of culinary excellence and heritage.
      </p>
      <div className="footer-social">
        {socialMedia.map((social, i) => (
          <a key={i} href={social.url} className="social-icon" aria-label={social.platform}>
            <FontAwesomeIcon icon={social.icon} />
          </a>
        ))}
      </div>
      <div className="app-download mt-4">
        <h6 className="mb-3">Download Our App</h6>
        <div className="app-store-section">
          <div className="app-buttons">
            <a href="#" className="app-button">
              <FontAwesomeIcon icon={faApple} className="me-2" /> App Store
            </a>
            <a href="#" className="app-button">
              <FontAwesomeIcon icon={faGooglePlay} className="me-2" /> Google Play
            </a>
          </div>
          <div className="qr-codes">
            {appDownloads.map((app) => (
              <div key={app.platform} className="qr-code-item">
                <img src={app.qrCodeUrl} alt={`${app.label} QR Code`} className="qr-image" />
                <span className="qr-label">{app.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card.Body>
  </Card>
);
