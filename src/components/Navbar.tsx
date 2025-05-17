import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Particles from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

// Logo component with memo for performance optimization
const Logo: React.FC = React.memo(() => {
  return (
    <div className="logo-container">
      <svg
        width="48"
        height="48"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-icon"
        aria-label="Yusensu Logo"
      >
        <circle cx="30" cy="30" r="28" stroke="var(--luxury-gold)" strokeWidth="2">
          <animate
            attributeName="r"
            from="28"
            to="29"
            dur="3s"
            repeatCount="indefinite"
            values="28;29;28"
          />
        </circle>
        <path
          d="M20 24C20 22.8954 20.8954 22 22 22H38C39.1046 22 40 22.8954 40 24V24C40 25.1046 39.1046 26 38 26H22C20.8954 26 20 25.1046 20 24V24Z"
          fill="var(--luxury-red)"
        >
          <animate
            attributeName="opacity"
            from="0.7"
            to="1"
            dur="2s"
            repeatCount="indefinite"
            values="0.7;1;0.7"
          />
        </path>
        <path
          d="M24 30C24 28.8954 24.8954 28 26 28H34C35.1046 28 36 28.8954 36 30V30C36 31.1046 35.1046 32 34 32H26C24.8954 32 24 31.1046 24 30V30Z"
          fill="var(--luxury-gold)"
        />
        <path
          d="M28 36C28 34.8954 28.8954 34 30 34H32C33.1046 34 34 34.8954 34 36V36C34 37.1046 33.1046 38 32 38H30C28.8954 38 28 37.1046 28 36V36Z"
          fill="var(--luxury-red)"
        />
      </svg>
      <div className="logo-text">
        <span className="logo-main">Yusensu</span>
        <span className="logo-tagline">Sushi Artistry</span>
      </div>
    </div>
  );
});

// Define navigation items with types for better type safety
interface NavItem {
  name: string;
  section?: string;
  path?: string;
  isExternal?: boolean;
}

// Navigation data structure for better maintainability
const NAV_DATA = {
  mainItems: [
    { name: 'Home', section: 'hero', path: '/' },
    { name: 'About', section: 'about', path: '/about' },
    { name: 'Menu', section: 'featured', path: '/menu' },
    { name: 'Reviews', section: 'testimonials', path: '/reviews' },
    { name: 'Gallery', section: 'gallery', path: '/gallery' },
    { name: 'Media', section: 'media', path: '/media' },
    { name: 'Reservation', section: 'contact', path: '/reservation' },
    { name: 'Contact', path: '/contact' },
    { name: 'Lab', path: '/labpractice' },
  ] as const,
  
  // Generate route map automatically from main items
  routeMap: {
    '/': 'Home',
    '/about': 'About',
    '/menu': 'Menu',
    '/reviews': 'Reviews',
    '/gallery': 'Gallery',
    '/reservation': 'Reservation',
    '/contact': 'Contact',
    '/cart': 'Cart',
    '/labpractice': 'Lab',
    '/media': 'Media',
    '/media/news': 'Media',
    '/media/blog': 'Media',
    '/media/faq': 'Media',
    '/media/partners': 'Media',
  } as const,
} as const;

const mainNavItems: NavItem[] = Array.from(NAV_DATA.mainItems);
const routeToNavMap: Record<string, string> = NAV_DATA.routeMap;

const Navbar: React.FC = () => {
  const { getItemCount } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const isScrollingRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize and configure Intersection Observer for scroll spy
  useEffect(() => {
    if (!isHomePage) return;
    
    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Initialize section refs
    sectionRefs.current.clear();
    mainNavItems.forEach(item => {
      if (item.section) {
        const element = document.getElementById(item.section);
        if (element) {
          sectionRefs.current.set(item.section, element);
        }
      }
    });
    
    // Options for the observer - improved for scroll-snapping
    const options = {
      root: null, // viewport
      rootMargin: '-5% 0px -45% 0px', // Adjusted to work better with snap points
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for smoother transitions
    };

    // Create a new Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
      // Skip updates during programmatic scrolling
      if (isScrollingRef.current) return;
      
      // Track the highest intersection ratio for visible sections
      let maxRatio = 0;
      let maxSection = '';

      entries.forEach(entry => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting) {
          // If this section has more visibility than the previous max
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxSection = sectionId;
          }
        }
      });

      // Only update if we found a visible section
      if (maxSection && maxRatio > 0) {
        setActiveSection(maxSection);
        
        // Update URL hash without scrolling
        if (window.history.replaceState) {
          window.history.replaceState(null, '', `/#${maxSection}`);
        }
      }
    }, options);

    // Observe all section elements
    sectionRefs.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      // Cleanup on unmount
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isHomePage]);

  // Special handling for page load - scroll to section if URL has hash
  useEffect(() => {
    if (isHomePage && location.hash) {
      const sectionId = location.hash.substring(1); // Remove # from hash
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300); // Small delay to ensure DOM is ready
    }
  }, [isHomePage, location.hash]);

  // Enhanced smooth scroll to section with snap consideration
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    const snapContainer = document.querySelector('.snap-container') as HTMLElement;
    
    if (section && snapContainer) {
      // Mark that we're programmatically scrolling
      isScrollingRef.current = true;
      
      // Temporarily disable snap during the scroll
      snapContainer.classList.add('scrolling-in-progress');
      
      // Get navbar height to offset scroll position
      const navbar = document.querySelector('.navbar-scrollspy');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
      
      // Calculate the position based on the section's position within the snap container
      const sectionTop = section.offsetTop;
      
      // Smooth scroll to the section
      snapContainer.scrollTo({
        top: sectionTop - navbarHeight,
        behavior: 'smooth'
      });
      
      // Set the active section
      setActiveSection(sectionId);
      
      // Clear any previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Re-enable snap after animation completes
      timeoutRef.current = setTimeout(() => {
        snapContainer.classList.remove('scrolling-in-progress');
        isScrollingRef.current = false;
      }, 1000); // Slightly longer than typical scroll animation
    }
  }, []);

  // Handle navigation click - either scroll or navigate
  const handleNavClick = useCallback((item: NavItem) => {
    if (isHomePage && item.section) {
      // If on home page and item has a section, scroll to it
      scrollToSection(item.section);
    } else if (item.section && location.pathname !== '/') {
      // If not on home page but item has a section, navigate to home with hash
      navigate(`/#${item.section}`);
    } else if (item.path) {
      // If no section or not on home page, navigate to the path
      navigate(item.path);
    }
  }, [isHomePage, scrollToSection, navigate, location.pathname]);

  // Determine active nav item
  const isNavItemActive = useCallback(
    (navName: string) => {
      if (isHomePage) {
        const section = mainNavItems.find(item => item.section === activeSection);
        return section?.name === navName;
      }
      return routeToNavMap[location.pathname] === navName;
    },
    [isHomePage, activeSection, location.pathname]
  );

  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      className={`navbar-scrollspy ${scrolled ? 'solid' : 'transparent'}`}
      aria-label="Main navigation"
    >
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="brand-container">
          <Logo />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" role="navigation">
            {mainNavItems.map((item, index) => (
              <Nav.Link
                key={item.name}
                as="div"
                className={`mx-2 ${isNavItemActive(item.name) ? 'active' : ''}`}
                onClick={() => handleNavClick(item)}
                style={{ '--nav-index': index } as React.CSSProperties}
                role="menuitem"
                aria-current={isNavItemActive(item.name) ? 'page' : undefined}
              >
                <span className="nav-indicator" />
                {item.name === 'Media' ? (
                  <span className="cursor-pointer">{item.name}</span>
                ) : isHomePage && item.section ? (
                  <span>{item.name}</span>
                ) : (
                  <Link to={item.path || '/'} className="text-decoration-none text-white">
                    {item.name}
                  </Link>
                )}
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link
                  as="div"
                  className="mx-2"
                  role="menuitem"
                >
                  <span className="text-white">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    {user.name}
                  </span>
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => navigate('/signin')}
                  className="me-2"
                >
                  Login
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
            <Nav.Link
              as="div"
              className={`ms-3 ${isNavItemActive('Cart') ? 'active' : ''}`}
              onClick={() => handleNavClick({ name: 'Cart', path: '/cart' })}
              role="menuitem"
            >
              <Link to="/cart" className="text-decoration-none text-white position-relative">
                <FontAwesomeIcon icon={faShoppingCart} className="shopping-cart-icon" />
                {getItemCount() > 0 && (
                  <Badge
                    pill
                    className="position-absolute top-0 start-100 translate-middle cart-badge"
                  >
                    {getItemCount()}
                  </Badge>
                )}
              </Link>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;