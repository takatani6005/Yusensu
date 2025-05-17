import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'react-bootstrap';

interface AwardsSectionProps {
  awards: string[];
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ awards }) => (
  <>
    <div className="footer-divider"></div>
    {awards.map((text, index) => (
      <Col key={index} md="auto" className="text-center text-md-start mt-4">
        <div className="footer-award-badge">
          <FontAwesomeIcon icon={faStar} className="award-icon" />
          <span>{text}</span>
        </div>
      </Col>
    ))}
  </>
);
