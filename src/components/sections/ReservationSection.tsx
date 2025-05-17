import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendarAlt, faClock, faUsers, faCommentAlt, faCheckCircle, faMapMarkerAlt, faPhone, faInfoCircle, faMailBulk, faMobileAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

// New component imports
import DateTimeSelection from '../reservation/DateTimeSelection';
import GuestsSelection from '../reservation/GuestsSelection';
import SpecialRequests from '../reservation/SpecialRequests';
import ContactFields from '../reservation/ContactFields';
import { InfoSection } from '../reservation/InfoSection';
import { motion } from 'framer-motion';

// Mock rate limiter with better organization
const orderLimiter = {
  ipLimitReached: false,
  phoneLimitReached: false,
  lastVerificationTime: null as number | null,
  verificationCooldown: 60000, // 1 minute cooldown
  
  isWithinCooldown() {
    if (!this.lastVerificationTime) return false;
    return (Date.now() - this.lastVerificationTime) < this.verificationCooldown;
  },
  
  canSendVerification() {
    return !this.isWithinCooldown() && !this.phoneLimitReached && !this.ipLimitReached;
  },
  
  recordVerificationAttempt() {
    this.lastVerificationTime = Date.now();
  }
};

// Animation variants
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }
};

const ContactSection: React.FC = () => {
  // Refs
  const formColumnRef = useRef<HTMLDivElement>(null);
  const infoColumnRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [columnHeight, setColumnHeight] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    message: '',
    customTime: '',
    session: [] as string[],
    phone: '',
    verificationCode: '',
    tableType: ''
  });
  
  // Verification state
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [limitErrors, setLimitErrors] = useState({
    phone: false,
    ip: false
  });
  
  // Mock verification code (in a real app, this would be generated on the server)
  const [mockCode] = useState('123456');

  // Cooldown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (cooldownTime > 0) {
      timer = setTimeout(() => {
        setCooldownTime(prevTime => prevTime - 1);
      }, 1000);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [cooldownTime]);

  // Input validation helpers
  const validators = {
    phoneNumber: (phone: string) => /^[0-9+\-\s()]{0,15}$/.test(phone),
    name: (name: string) => /^[A-Za-z\s.''-]{0,50}$/.test(name),
    verificationCode: (code: string) => /^\d{0,6}$/.test(code)
  };

  // Form event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    // Apply validation based on field type
    if (id === 'phone' && !validators.phoneNumber(value)) return;
    if (id === 'name' && !validators.name(value)) return;
    if (id === 'verificationCode' && !validators.verificationCode(value)) return;
    
    // Update form values
    setFormValues({
      ...formValues,
      [id]: value
    });
    
    // Reset verification if phone number changes
    if (id === 'phone' && isVerificationSent) {
      setIsVerificationSent(false);
      setIsVerified(false);
    }
  };
  

  const handleTimeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      time: '',
      customTime: value
    });
  };
  
  // Verification handlers
  const handleSendVerificationCode = () => {
    // Validate phone number
    if (!formValues.phone || formValues.phone.length < 10) {
      setVerificationError('Please enter a valid phone number');
      return;
    }

    // Check rate limits
    if (orderLimiter.phoneLimitReached) {
      setLimitErrors({...limitErrors, phone: true});
      setVerificationError('Too many requests from this phone number. Please try again later.');
      return;
    }
    
    if (orderLimiter.ipLimitReached) {
      setLimitErrors({...limitErrors, ip: true});
      setVerificationError('Too many requests from this location. Please try again later.');
      return;
    }
    
    // Check cooldown period
    if (orderLimiter.isWithinCooldown()) {
      setVerificationError('Please wait before requesting another verification code');
      setCooldownTime(Math.ceil(orderLimiter.verificationCooldown / 1000));
      return;
    }
    
    // Send verification code
    setVerificationError('');
    setIsSendingCode(true);
    
    // Simulate sending code (replace with actual API call)
    setTimeout(() => {
      setIsVerificationSent(true);
      setIsSendingCode(false);
      orderLimiter.recordVerificationAttempt();
      setCooldownTime(Math.ceil(orderLimiter.verificationCooldown / 1000));
      
      // Alert user (replace with actual notification)
      alert(`Verification code sent: ${mockCode}`);
    }, 1500);
  };
  
  const handleVerifyCode = () => {
    if (!formValues.verificationCode) {
      setVerificationError('Please enter the verification code');
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate verification (replace with actual API call)
    setTimeout(() => {
      if (formValues.verificationCode === mockCode) {
        setIsVerified(true);
        setVerificationError('');
      } else {
        setVerificationError('Invalid verification code');
      }
      setIsVerifying(false);
    }, 1000);
  };

  // Form submission handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    // Verify phone
    if (!isVerified) {
      setVerificationError('Phone verification is required');
      return;
    }
    
    // Check form validity
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setValidated(false);
      
      // Reset form
      setFormValues({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '',
        message: '',
        customTime: '',
        session: [],
        phone: '',
        verificationCode: '',
        tableType: ''
      });
      
      // Reset verification status
      setIsVerificationSent(false);
      setIsVerified(false);
      
      // Hide success message after delay
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Adjust column heights to be equal
  useEffect(() => {
    const adjustHeight = () => {
      if (formColumnRef.current && infoColumnRef.current) {
        // Reset heights
        formColumnRef.current.style.height = 'auto';
        infoColumnRef.current.style.height = 'auto';
        
        // Get natural heights
        const formHeight = formColumnRef.current.offsetHeight;
        const infoHeight = infoColumnRef.current.offsetHeight;
        
        // Set equal height
        const maxHeight = Math.max(formHeight, infoHeight);
        formColumnRef.current.style.height = `${maxHeight}px`;
        infoColumnRef.current.style.height = `${maxHeight}px`;
        
        setColumnHeight(maxHeight);
      }
    };

    // Initial adjustment
    adjustHeight();
    
    // Adjust on resize
    window.addEventListener('resize', adjustHeight);
    
    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [showSuccess, isVerificationSent, isVerified]);

  // UI Components
  const AlertMessage = ({ type, icon, message }: { type: string, icon: any, message: string }) => (
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

  // Styled button with motion effects
  const StyledButton = ({ 
    children, 
    isEnabled = true, 
    isLoading = false, 
    onClick = () => {}, 
    type = "button"
  }: { 
    children: React.ReactNode, 
    isEnabled?: boolean, 
    isLoading?: boolean, 
    onClick?: () => void,
    type?: "button" | "submit" | "reset"
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
   const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (containerRef.current)   observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      
    };
  }, []);

  return (
    <section 
      className="snap-section" 
      id="contact"
      style={{ 
        backgroundImage: 'url(https://source.unsplash.com/7Z03R1wOdmI/1920x1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
      aria-label="Reservation section"
    >
      <div className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ opacity: 0.8, zIndex: 0 }} aria-hidden="true"></div>
      
      <Container className="position-relative" style={{ zIndex: 1 }} fluid>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Row className="justify-content-center">
            <Col lg={12} >
             
              <div className="text-center mt-0">
                <div className="luxury-header-container" ref={containerRef}>
                  <div className="luxury-header-line luxury-header-line-left"></div>
                  <h2 className="luxury-header text-gold" style={{fontSize: 'clamp(1.75rem, 6vw, 3.5rem)'}} >
                  Reservation
                    <span className="luxury-subtext">鮨物語</span>
                  </h2>
                  <div className="luxury-header-line luxury-header-line-right"></div>
                  <div className="luxury-glow-overlay"></div>
                </div>
              </div>
            </Col>
          </Row>
        </motion.div>
        
        <motion.div
          variants={animations.container}
          initial="hidden"
          animate="visible"
        >
          <Row className="justify-content-center g-4 mx-md-5 mx-2">
            <Col lg={7} md={11}>
              <motion.div variants={animations.item} ref={formColumnRef} className="h-100">
                <div 
                  className="p-md-5 p-3 rounded shadow h-100 d-flex flex-column"
                  style={{
                    borderRadius: '15px',
                    background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.9), rgba(42, 42, 42, 0.9))',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Success Alert */}
                  {showSuccess && (
                    <AlertMessage 
                      type="success" 
                      icon={faCheckCircle}
                      message="Your reservation has been successfully submitted! We will contact you shortly to confirm."
                    />
                  )}
                  
                  {/* Rate Limit Alerts */}
                  {(limitErrors.phone || limitErrors.ip) && (
                    <AlertMessage 
                      type="danger" 
                      icon={faInfoCircle}
                      message={limitErrors.phone 
                        ? 'Too many reservation attempts from this phone number. Please try again later.' 
                        : 'Too many reservation attempts from your location. Please try again later.'}
                    />
                  )}
                  
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {/* Contact Information */}
                    <ContactFields
                      name={formValues.name}
                      email={formValues.email}
                      onChange={handleChange}
                    />
                    
                    {/* Phone Verification Section */}
                    <div className="mb-4 p-md-3 p-2 rounded" style={{ 
                      backgroundColor: 'rgba(255, 215, 0, 0.05)',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}>
                      <h6 className="text-gold mb-3 d-flex align-items-center fs-md-6 fs-7">
                        <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                        Phone Verification
                      </h6>
                      
                      <Form.Group className="mb-3" controlId="phone">
                        <InputGroup className="flex-wrap">
                          <InputGroup.Text 
                            className="bg-transparent text-gold border-end-0"
                            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                          >
                            <FontAwesomeIcon icon={faMobileAlt} />
                          </InputGroup.Text>
                          <Form.Control 
                            type="tel" 
                            placeholder="Phone Number" 
                            required
                            value={formValues.phone}
                            onChange={handleChange}
                            className="bg-transparent text-light border-start-0"
                            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                            disabled={isVerificationSent || isVerified}
                            maxLength={15}
                            pattern="[0-9+\-\s()]{10,15}"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') e.preventDefault();
                            }}
                          />
                          <Button 
                            variant="outline-warning"
                            onClick={handleSendVerificationCode}
                            disabled={isSendingCode || isVerified || cooldownTime > 0 || !formValues.phone}
                            className="border-start-0"
                            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                          >
                            {isSendingCode ? (
                              <Spinner animation="border" size="sm" />
                            ) : isVerificationSent ? (
                              cooldownTime > 0 ? `Resend (${cooldownTime}s)` : 'Resend Code'
                            ) : (
                              'Send Code'
                            )}
                          </Button>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid" className="text-warning">
                          Please provide a valid phone number.
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      {isVerificationSent && !isVerified && (
                        <Form.Group className="mb-2" controlId="verificationCode">
                          <InputGroup>
                            <InputGroup.Text 
                              className="bg-transparent text-gold border-end-0"
                              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                            >
                              <FontAwesomeIcon icon={faShieldAlt} />
                            </InputGroup.Text>
                            <Form.Control 
                              type="text" 
                              placeholder="Enter Verification Code" 
                              value={formValues.verificationCode}
                              onChange={handleChange}
                              className="bg-transparent text-light border-start-0 border-end-0"
                              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                              maxLength={6}
                              pattern="\d{6}"
                              inputMode="numeric"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') e.preventDefault();
                              }}
                            />
                            <Button 
                              variant="outline-warning"
                              onClick={handleVerifyCode}
                              disabled={isVerifying || !formValues.verificationCode}
                              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
                            >
                              {isVerifying ? (
                                <Spinner animation="border" size="sm" />
                              ) : (
                                'Verify'
                              )}
                            </Button>
                          </InputGroup>
                          <small className="text-muted d-block mt-1">Enter the 6-digit code sent to your phone.</small>
                        </Form.Group>
                      )}
                      
                      {isVerified && (
                        <AlertMessage type="success" icon={faCheckCircle} message="Phone number verified successfully!" />
                      )}
                      
                      {verificationError && (
                        <AlertMessage type="danger" icon={faInfoCircle} message={verificationError} />
                      )}
                    </div>
                    
                    <DateTimeSelection
                      date={formValues.date}
                      customTime={formValues.customTime}
                      onChange={handleChange}
                      onTimeChange={handleTimeInput}
                    />
                    
                    <GuestsSelection
                      guestCount={formValues.guests}
                      tableType={formValues.tableType}
                      onGuestCountChange={handleChange}
                      onTableTypeChange={handleChange}
                    />
                    
                    <SpecialRequests
                      message={formValues.message}
                      onChange={handleChange}
                    />
                    
                    <div className="d-grid">
                      <StyledButton 
                        isEnabled={isVerified}
                        isLoading={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? 
                          'Processing...' : 
                          !isVerified ? 'Verify Phone to Continue' : 'Reserve Now'
                        }
                      </StyledButton>
                    </div>
                  </Form>
                </div>
              </motion.div>
            </Col>
            
            <Col lg={5} md={11}>
              <motion.div variants={animations.item} ref={infoColumnRef} className="h-100">
                <InfoSection 
                  variants={animations.item} 
                  forwardedRef={infoColumnRef} 
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactSection;