import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // In a real application, you would send this data to your server
    console.log('Newsletter signup:', email);
    setSubmitted(true);
    setEmail('');
    setValidated(false);
    
    // Reset the submission message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <h2 className="mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-4">
              Stay updated with our latest menu items, special offers, and events.
            </p>
            
            {submitted && (
              <Alert variant="success" className="mb-4">
                Thank you for subscribing to our newsletter!
              </Alert>
            )}
            
            <Form 
              noValidate 
              validated={validated} 
              onSubmit={handleSubmit} 
              className="d-flex flex-column flex-md-row gap-2"
            >
              <Form.Group controlId="newsletterEmail" className="flex-grow-1 mb-0">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="py-3"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="px-4"
              >
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter; 