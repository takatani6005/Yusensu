import React from 'react';
import '../styles/animations.css';

interface ScrollDownIndicatorProps {
  onClick: () => void;
  text?: string;
}

const ScrollDownIndicator: React.FC<ScrollDownIndicatorProps> = ({ 
  onClick, 
  text = 'Scroll Down' 
}) => {
  return (
    <div className="scroll-down" onClick={onClick} role="button" aria-label={text}>
      <span className="scroll-down-text">{text}</span>
      <div className="scroll-down-arrow" />
    </div>
  );
};

export default ScrollDownIndicator; 