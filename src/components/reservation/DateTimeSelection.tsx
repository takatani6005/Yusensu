import React from 'react';
import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

interface DateTimeSelectionProps {
  date: string;
  customTime: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  date,
  customTime,
  onChange,
  onTimeChange
}) => {
  return (
    <Row>
      <Col md={6} className="mb-md-4 mb-3">
        <Form.Group controlId="date">
          <InputGroup>
            <InputGroup.Text 
              className="bg-transparent text-gold border-end-0"
              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </InputGroup.Text>
            <Form.Control 
              type="date" 
              required
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={onChange}
              className="bg-transparent text-light border-start-0"
              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid" className="text-warning">
            Please select a valid date.
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
      
      <Col md={6} className="mb-md-4 mb-3">
        <InputGroup>
          <InputGroup.Text 
            className="bg-transparent text-gold border-end-0"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
          >
            <FontAwesomeIcon icon={faClock} />
          </InputGroup.Text>
          <Form.Control 
            type="time" 
            value={customTime}
            onChange={onTimeChange}
            className="bg-transparent text-light border-start-0"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            required
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault();
            }}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid" className="text-warning">
          Please select a preferred time.
        </Form.Control.Feedback>
      </Col>
    </Row>
  );
};

export default DateTimeSelection;
