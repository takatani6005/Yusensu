import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface HeaderProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const ReservationHeader: React.FC<HeaderProps> = ({ containerRef }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <Row className="justify-content-center">
      <Col lg={12}>
        <div className="text-center mt-0">
          <div className="luxury-header-container" ref={containerRef}>
            <div className="luxury-header-line luxury-header-line-left"></div>
            <h2 
              className="luxury-header text-gold" 
              style={{fontSize: 'clamp(1.75rem, 6vw, 3.5rem)'}}
            >
              Reservation
              <span className="luxury-subtext">鮨物語</span>
            </h2>
            <div className="luxury-header-line luxury-header-line-right"></div>
            <div className="luxury-glow-overlay"></div>
          </div>
        </div>
      </Col>
    </Row>
  </motion.div>
);
