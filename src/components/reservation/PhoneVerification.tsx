import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { ReservationFormValues, VerificationState } from '../../types/reservation';
import { StyledButton } from '../common/StyledButton';

interface PhoneVerificationProps {
  formValues: ReservationFormValues;
  verification: VerificationState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendVerificationCode: () => void;
  handleVerifyCode: () => void;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  formValues,
  verification,
  handleChange,
  handleSendVerificationCode,
  handleVerifyCode
}) => {
  const {
    isVerificationSent,
    isVerified,
    verificationError,
    isSendingCode,
    isVerifying,
    cooldownTime
  } = verification;

  return (
    <div className="mb-4 p-md-3 p-2 rounded" 
      style={{ 
        backgroundColor: 'rgba(255, 215, 0, 0.05)',
        border: '1px solid rgba(255, 215, 0, 0.2)'
      }}
    >
      <h6 className="text-gold mb-3 d-flex align-items-center fs-md-6 fs-7">
        <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
        Phone Verification
      </h6>
      
      <Form.Group className="mb-3" controlId="phone">
        <InputGroup className="flex-wrap">
          <Form.Control 
            type="tel" 
            placeholder="Phone Number" 
            required
            value={formValues.phone}
            onChange={handleChange}
            className="bg-transparent text-light"
            style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
            disabled={isVerificationSent || isVerified}
            maxLength={15}
            pattern="[0-9+\-\s()]{10,15}"
          />
          {!isVerificationSent && !isVerified && (
            <div className="w-100 mt-2">
              <StyledButton
                onClick={handleSendVerificationCode}
                isEnabled={formValues.phone.length >= 10 && !isSendingCode && cooldownTime === 0}
                isLoading={isSendingCode}
              >
                {isSendingCode ? 'Sending...' : cooldownTime > 0 ? `Wait ${cooldownTime}s` : 'Send Code'}
              </StyledButton>
            </div>
          )}
        </InputGroup>
      </Form.Group>
      
      {isVerificationSent && !isVerified && (
        <Form.Group className="mb-3" controlId="verificationCode">
          <InputGroup className="flex-wrap">
            <Form.Control
              type="text"
              placeholder="Enter 6-digit code"
              value={formValues.verificationCode}
              onChange={handleChange}
              className="bg-transparent text-light"
              style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
              maxLength={6}
              required
            />
            <div className="w-100 mt-2">
              <StyledButton
                onClick={handleVerifyCode}
                isEnabled={formValues.verificationCode.length === 6}
                isLoading={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify Code'}
              </StyledButton>
            </div>
          </InputGroup>
        </Form.Group>
      )}
      
      {verificationError && (
        <div className="text-danger small mt-2">{verificationError}</div>
      )}
      
      {isVerified && (
        <div className="text-success small mt-2">
          ✓ Phone number verified successfully
        </div>
      )}
    </div>
  );
};
