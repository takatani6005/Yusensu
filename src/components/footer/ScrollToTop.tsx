import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface ScrollToTopProps {
  visible: boolean;
  onClick: () => void;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ visible, onClick }) => (
  <button 
    className={`scroll-top-button ${visible ? 'visible' : ''}`}
    onClick={onClick}
    aria-label="Scroll to top"
  >
    <FontAwesomeIcon icon={faChevronUp} />
  </button>
);
