import React from 'react';
import { Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ReservationFormValues } from '../../types/reservation';

interface ReservationFormFieldsProps {
  formValues: ReservationFormValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const ReservationFormFields: React.FC<ReservationFormFieldsProps> = ({
  formValues,
  handleChange
}) => {
  const preventEnterSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
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
                value={formValues.name}
                onChange={handleChange}
                className="bg-transparent text-light border-start-0"
                style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                maxLength={50}
                onKeyDown={preventEnterSubmit}
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
                value={formValues.email}
                onChange={handleChange}
                className="bg-transparent text-light border-start-0"
                style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                maxLength={100}
                onKeyDown={preventEnterSubmit}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid" className="text-warning">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};
