import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FooterLink } from '../../types/footer';

interface FooterBottomProps {
  links: FooterLink[];
}

export const FooterBottom: React.FC<FooterBottomProps> = ({ links }) => (
  <Row className="footer-bottom py-4 align-items-center mt-auto">
    <Col md={6} className="text-start">
      <p className="mb-0 mx-2">© {new Date().getFullYear()} Yusensu | All Rights Reserved</p>
    </Col>
    <Col md={6}>
      <ul className="legal-links d-flex justify-content-end align-items-center gap-2 list-unstyled mx-5">
        {links.map((link, i) => (
          <React.Fragment key={link.text}>
            {i > 0 && <li className="separator-dot"><FontAwesomeIcon icon={faCircle} /></li>}
            <li><Link to={link.url} className="text-decoration-none">{link.text}</Link></li>
          </React.Fragment>
        ))}
      </ul>
    </Col>
  </Row>
);
