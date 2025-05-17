import React from 'react';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlertMessageProps } from '../../types/reservation';

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, icon, message }) => (
  <Alert 
    variant={type} 
    className="mb-4"
    style={{
      backgroundColor: type === 'success' 
        ? 'rgba(0, 150, 0, 0.1)' 
        : 'rgba(150, 0, 0, 0.1)',
      borderColor: '#ffd700',
      color: '#ffd700'
    }}
  >
    <div className="d-flex align-items-center">
      <FontAwesomeIcon icon={icon} className="me-2" />
      <span>{message}</span>
    </div>
  </Alert>
);
