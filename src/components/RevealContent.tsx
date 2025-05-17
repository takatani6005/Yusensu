import React, { ReactNode } from 'react';
import '../styles/animations.css';

type AnimationType = 'fade-in' | 'scale-in' | 'slide-in-left' | 'slide-in-right';
type DelayType = 'delay-100' | 'delay-200' | 'delay-300' | 'delay-400' | 'delay-500' | '';

interface RevealContentProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: DelayType;
  className?: string;
}

const RevealContent: React.FC<RevealContentProps> = ({
  children,
  animation = 'fade-in',
  delay = '',
  className = ''
}) => {
  return (
    <div className={`reveal-content ${animation} ${delay} ${className}`}>
      {children}
    </div>
  );
};

export default RevealContent; 