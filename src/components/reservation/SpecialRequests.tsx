import React from 'react';
import { Form } from 'react-bootstrap';

interface SpecialRequestsProps {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SpecialRequests: React.FC<SpecialRequestsProps> = ({
  message,
  onChange
}) => {
  return (
    <Form.Group controlId="message" className="mb-4">
      <Form.Control
        as="textarea"
        rows={4}
        placeholder="Special Requests or Additional Notes"
        value={message}
        onChange={onChange}
        className="bg-transparent text-light"
        style={{ 
          borderColor: 'rgba(255, 215, 0, 0.3)', 
          resize: 'none',
          height: '60px',
        }}
      />
    </Form.Group>
  );
};

export default SpecialRequests;
