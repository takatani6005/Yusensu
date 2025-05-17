import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    // In a real application, you would send this data to a server
    console.log('Form data submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setValidated(false);

    // Reset the submission message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">Contact Us</h1>
          <p className="lead text-center">Have questions or feedback? We'd love to hear from you!</p>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-5 mb-lg-0">
          <h2 className="mb-4">Send us a message</h2>
          
          {submitted && (
            <Alert variant="success">
              Thank you for your message! We'll get back to you soon.
            </Alert>
          )}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter subject"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a subject.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a message.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Col>

        <Col lg={6}>
          <h2 className="mb-4">Our Information</h2>
          
          <div className="contact-info mb-5">
            <div className="d-flex mb-4">
              <div className="icon me-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
              </div>
              <div>
                <h5 className="mb-1">Address</h5>
                <p className="mb-0">123 Sushi Street, Tokyo, Japan</p>
              </div>
            </div>
            
            <div className="d-flex mb-4">
              <div className="icon me-3">
                <FontAwesomeIcon icon={faPhone} size="lg" />
              </div>
              <div>
                <h5 className="mb-1">Phone</h5>
                <p className="mb-0">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="d-flex mb-4">
              <div className="icon me-3">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </div>
              <div>
                <h5 className="mb-1">Email</h5>
                <p className="mb-0">info@yusensu.com</p>
              </div>
            </div>
            
            <div className="d-flex mb-4">
              <div className="icon me-3">
                <FontAwesomeIcon icon={faClock} size="lg" />
              </div>
              <div>
                <h5 className="mb-1">Opening Hours</h5>
                <p className="mb-0">Monday - Friday: 11:00 AM - 10:00 PM</p>
                <p className="mb-0">Saturday: 11:00 AM - 11:00 PM</p>
                <p className="mb-0">Sunday: 12:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
          
          {/* Google Maps Embed */}
          <div className="map-container">
            <h2 className="mb-4">Find us on the map</h2>
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6483.185897905713!2d139.7707284947133!3d35.67566668789798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfce0fa7ee7%3A0x683ca062dfdba1c4!2sTsukiji%20Outer%20Market!5e0!3m2!1sen!2sus!4v1626932496213!5m2!1sen!2sus"
                title="Restaurant Location"
                allowFullScreen
                loading="lazy"
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact; 