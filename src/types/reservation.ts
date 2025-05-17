// Rate limiter interface
export interface OrderLimiter {
  ipLimitReached: boolean;
  phoneLimitReached: boolean;
  lastVerificationTime: number | null;
  verificationCooldown: number;
  isWithinCooldown(): boolean;
  canSendVerification(): boolean;
  recordVerificationAttempt(): void;
}

// Form values interface
export interface ReservationFormValues {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  message: string;
  customTime: string;
  session: string[];
  phone: string;
  verificationCode: string;
  tableType: string;
}

// Form validation interface
export interface Validators {
  phoneNumber: (phone: string) => boolean;
  name: (name: string) => boolean;
  verificationCode: (code: string) => boolean;
}

// Component props interfaces
export interface AlertMessageProps {
  type: 'success' | 'danger' | 'warning' | 'info';
  icon: any;
  message: string;
}

export interface StyledButtonProps {
  children: React.ReactNode;
  isEnabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface VerificationState {
  isVerificationSent: boolean;
  isVerified: boolean;
  verificationError: string;
  isSendingCode: boolean;
  isVerifying: boolean;
  cooldownTime: number;
  limitErrors: {
    phone: boolean;
    ip: boolean;
  };
}
