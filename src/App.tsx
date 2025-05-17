import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/index.css';
import './styles/responsive.new.css';
import './styles/layout.responsive.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import MediaHub from './pages/MediaHub';
import Lab from './pages/LabPractice';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// Context
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WindowSizeProvider } from './context/WindowSizeContext';

// Content Protection
import { useContentProtection } from './hooks/useContentProtection';
import Reservation from './components/sections/ReservationSection';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);
  
  // Apply all content protection features globally
  useContentProtection({ all: true });
  
  return (
    <AuthProvider>
      <WindowSizeProvider>
        <CartProvider>
          <div className={`App ${isHomePage ? 'home-page' : ''}`}>
            {!isAuthPage && <Navbar />}
            <main className="main-content">
              <Routes>
                {/* Auth Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Main Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                {/* Protected Routes */}
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/media" element={<MediaHub />} />
                <Route path="/reservation" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
                
                {/* Lab Practice Routes */}
                <Route path="/labpractice" element={<Lab />} />
                
                {/* Redirect all other routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            {!isHomePage && !isAuthPage && <div className="footer-wrapper">{<Footer />}</div>}
          </div>
        </CartProvider>
      </WindowSizeProvider>
    </AuthProvider>
  );
}

export default App;
