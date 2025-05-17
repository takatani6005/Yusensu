import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ContactFieldsProps {
  name: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactFields: React.FC<ContactFieldsProps> = ({
  name,
  email,
  onChange
}) => {
  return (
    <>
      <Form.Group className="mb-4" controlId="name">
        <InputGroup>
          <InputGroup.Text 
            className="bg-transparent text-gold border-end-0"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <FontAwesomeIcon icon={faUser} />
          </InputGroup.Text>
          <Form.Control 
            type="text" 
            placeholder="Your Name" 
            required 
            value={name}
            onChange={onChange}
            className="bg-transparent text-light border-start-0"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            maxLength={50}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid" className="text-warning">
          Please provide your name.
        </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className="mb-4" controlId="email">
        <InputGroup>
          <InputGroup.Text 
            className="bg-transparent text-gold border-end-0"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </InputGroup.Text>
          <Form.Control 
            type="email" 
            placeholder="Your Email" 
            required
            value={email}
            onChange={onChange}
            className="bg-transparent text-light border-start-0"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            maxLength={100}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid" className="text-warning">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default ContactFields;
