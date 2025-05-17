import { User } from '../types/auth';

// This is a mock implementation. In a real app, these would make API calls to your backend
class AuthService {
  private readonly storageKey = 'auth_user';

  async login(email: string, password: string): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate credentials against your backend
    if (email && password) {
      const user = {
        id: '1',
        name: email.split('@')[0], // Use part of email as name for demo
        email: email,
      };
      
      // Generate a mock token
      const token = btoa(`${email}:${Date.now()}`);
      
      // Store user data and token
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      localStorage.setItem('auth_token', token);
      return user;
    }
    
    throw new Error('Invalid credentials');
  }

  async register(name: string, email: string, password: string): Promise<User> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate and create user in your backend
    if (name && email && password) {
      const user = {
        id: '1',
        name: name,
        email: email,
      };
      
      // Generate a mock token
      const token = btoa(`${email}:${Date.now()}`);
      
      // Store user data and token
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      localStorage.setItem('auth_token', token);
      return user;
    }
    
    throw new Error('Registration failed');
  }

  async logout(): Promise<void> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('auth_token');
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }
}

export const authService = new AuthService();