import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { BusinessHours } from '../../types/footer';

interface HoursSectionProps {
  hours: BusinessHours[];
  languages: string[];
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  animateElements: boolean;
}

export const HoursSection: React.FC<HoursSectionProps> = ({
  hours,
  languages,
  currentLanguage,
  onLanguageChange,
  animateElements
}) => (
  <Card className={`footer-card h-100 `} style={{ animationDelay: '0.3s' }}>
    <Card.Body>
      <h5 className="footer-heading">Hours</h5>
      <ul className="footer-hours">
        {hours.map((hour, index) => (
          <li key={index}>
            <span className="day">{hour.day}</span>
            <span className="divider"></span>
            <span className="time">{hour.time}</span>
          </li>
        ))}
      </ul>
      <div className="reservation-button mt-4">
        <Link to="/#contact">
          <Button variant="outline-primary" size="sm" className="w-100 pulse-button">
            <FontAwesomeIcon icon={faUtensils} className="me-2" /> Reserve a Table
          </Button>
        </Link>
      </div>
      <div className="language-selector mt-4">
        <h6 className="mb-3">Select Language</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" size="sm" className="w-100" id="language-dropdown">
            <FontAwesomeIcon icon={faGlobe} className="me-2" /> {currentLanguage}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100">
            {languages.map((lang) => (
              <Dropdown.Item 
                key={lang} 
                onClick={() => onLanguageChange(lang)} 
                active={currentLanguage === lang}
              >
                {lang}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Card.Body>
  </Card>
);
