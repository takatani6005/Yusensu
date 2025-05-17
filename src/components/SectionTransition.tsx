import React, { useState, useEffect, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  inView: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  inView,
  delay = 0,
  direction = 'up',
  duration = 800,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (inView) {
      timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(false);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [inView, delay]);

  // Get transform values based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'left':
        return 'translateX(40px)';
      case 'right':
        return 'translateX(-40px)';
      default:
        return 'translateY(40px)';
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default SectionTransition; 