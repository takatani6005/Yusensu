import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link, useLocation, Location } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Check if there's a redirect location
      const state = location.state as { from?: Location };
      const from = state?.from?.pathname || '/';
      navigate(from);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    }
  };

  return (
    <div className="signin-page py-5" style={{ minHeight: '100vh', backgroundColor: '#000' }}>
      <Container className="h-100 d-flex align-items-center justify-content-center" fluid>
        <div className="auth-form-container" style={{ 
          maxWidth: '400px', 
          width: '100%', 
          padding: '2rem',
          backgroundColor: 'rgba(20, 20, 20, 0.95)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <h2 className="text-center mb-4 text-gold">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-gold">Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-dark text-white border-gold"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-gold">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="bg-dark text-white border-gold"
              />
            </Form.Group>
            <Button 
              type="submit" 
              className="w-100 mb-3"
              style={{
                background: 'linear-gradient(90deg, #ffd700, #ffec80, #ffd700)',
                border: 'none',
                color: '#000',
                padding: '0.75rem',
                fontWeight: 'bold'
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            <div className="text-center">
              <Link to="/signup" className="text-gold text-decoration-none">Don't have an account? Sign up</Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
