import React from 'react';
import { Form, InputGroup, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

interface GuestsSelectionProps {
  guestCount: string;
  tableType: string;
  onGuestCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onTableTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GuestsSelection: React.FC<GuestsSelectionProps> = ({
  guestCount,
  tableType,
  onGuestCountChange,
  onTableTypeChange
}) => {
  return (
    <Row>
      <Col md={6} className="mb-md-4 mb-3">
        <Form.Group controlId="guests">
          <InputGroup>
            <InputGroup.Text 
              className="bg-transparent text-gold border-end-0"
              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            >
              <FontAwesomeIcon icon={faUser} />
            </InputGroup.Text>
            <Form.Select
              value={guestCount}
              onChange={onGuestCountChange}
              required
              className="bg-transparent text-light border-start-0"
              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            >
              <option value="">Number of Guests</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
          <Form.Control.Feedback type="invalid" className="text-warning">
            Please select the number of guests.
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col md={6} className="mb-md-4 mb-3">
        <Form.Group controlId="tableType">
          <InputGroup>
            <InputGroup.Text 
              className="bg-transparent text-gold border-end-0"
              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            >
              <FontAwesomeIcon icon={faUsers} />
            </InputGroup.Text>
            <Form.Select
              value={tableType}
              onChange={onTableTypeChange}
              required
              className="bg-transparent text-light border-start-0"
              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            >
              <option value="">Table Type</option>
              <option value="Regular">Regular Table</option>
              <option value="Bar">Bar Seating</option>
              <option value="Private">Private Room</option>
            </Form.Select>
          </InputGroup>
          <Form.Control.Feedback type="invalid" className="text-warning">
            Please select a table type.
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default GuestsSelection;
