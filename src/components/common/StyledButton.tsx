import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { StyledButtonProps } from '../../types/reservation';

export const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  isEnabled = true,
  isLoading = false,
  onClick = () => {},
  type = "button"
}) => (
  <motion.div
    whileHover={{ scale: isEnabled ? 1.02 : 1 }}
    whileTap={{ scale: isEnabled ? 0.98 : 1 }}
  >
    <Button 
      variant="primary" 
      type={type}
      onClick={onClick}
      disabled={!isEnabled || isLoading}
      style={{
        background: isEnabled 
          ? 'linear-gradient(90deg, #ffd700, #ffec80, #ffd700)'
          : 'linear-gradient(90deg, #999, #ccc, #999)',
        border: 'none',
        color: '#000',
        fontWeight: 'bold',
        letterSpacing: '1px',
        padding: '12px',
        boxShadow: isEnabled 
          ? '0 4px 10px rgba(255, 215, 0, 0.3)'
          : '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        width: '100%'
      }}
    >
      {isLoading ? (
        <>
          <Spinner animation="border" size="sm" className="me-2" /> 
          Processing...
        </>
      ) : children}
    </Button>
  </motion.div>
);
