import { faFacebook, faInstagram, faPinterest, faTiktok, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

interface SectionData {
  id: string;
  title: string;
  icon: string;
}

interface ScrollSpyProps {
  sections: SectionData[];
  activeSection: number;
  scrollToSection: (index: number) => void;
  scrollLineRef: React.RefObject<HTMLDivElement>;
  scrollProgressRef: React.RefObject<HTMLDivElement>;
}

// Animation types for the dots
const ANIMATION_TYPES = ['float1', 'float2', 'float3'];

// Animation positions (helps create cycles where dots stop at different points)
const ANIMATION_POSITIONS = [
  { start: 5, mid: 50, end: 95 }, // Position variants for float1
  { start: 80, mid: 30, end: 10 }, // Position variants for float2
  { start: 40, mid: 65, end: 20 }  // Position variants for float3
];

const ScrollSpy: React.FC<ScrollSpyProps> = ({ 
  sections, 
  activeSection, 
  scrollToSection,
  scrollLineRef,
  scrollProgressRef
}) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialLineRef = useRef<HTMLDivElement>(null);
  const socialProgressRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Refs for dot animation containers
  const rightNavDotsRef = useRef<HTMLDivElement>(null);
  const mobileNavDotsRef = useRef<HTMLDivElement>(null);
  
  // Animation timeouts and cycles
  const dotAnimationTimeouts = useRef<NodeJS.Timeout[]>([]);
  
  // Track screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Track scroll position to hide/show nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling stops
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Hide nav during active scrolling
      if (Math.abs(currentScrollY - lastScrollY.current) > 20) {
        setIsNavVisible(false);
      }
      
      // Set a timeout to show the nav after scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsNavVisible(true);
      }, 800);
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);
  
  // Initialize dot animations
  useEffect(() => {
    // Clean up previous animation timeouts
    dotAnimationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    dotAnimationTimeouts.current = [];
    
    // Start dot animations
    if (rightNavDotsRef.current) initDotAnimations(rightNavDotsRef.current);
    if (mobileNavDotsRef.current) initDotAnimations(mobileNavDotsRef.current);
    
    return () => {
      dotAnimationTimeouts.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
  
  // Function to manage dot animations with cycling and pauses
  const initDotAnimations = (container: HTMLDivElement) => {
    const dots = Array.from(container.querySelectorAll('.dot'));
    
    // Reset all dots first
    dots.forEach(dot => {
      dot.classList.remove('visible');
      dot.removeAttribute('data-animation');
    });
    
    // Create cycling animation for each dot
    dots.forEach((dot, index) => {
      // Start the animation cycle with staggered delays
      const initialDelay = 1000 + (index * 1500);
      const timeout = setTimeout(() => {
        startAnimationCycle(dot as HTMLElement, index);
      }, initialDelay);
      
      dotAnimationTimeouts.current.push(timeout);
    });
  };
  
  // Create a continuous animation cycle for a dot
  const startAnimationCycle = (dot: HTMLElement, index: number) => {
    // Track the current position in the sequence
    let positionIndex = 0;
    let animationTypeIndex = index % ANIMATION_TYPES.length;
    
    // Function to move dot to next position
    const moveToNextPosition = () => {
      // Hide dot first
      dot.classList.remove('visible');
      
      // Clear any existing animation
      dot.removeAttribute('data-animation');
      
      // Wait a bit before showing dot at new position
      const timeout = setTimeout(() => {
        // Get current animation type
        const animationType = ANIMATION_TYPES[animationTypeIndex];
        
        // Apply new animation
        dot.setAttribute('data-animation', animationType);
        
        // Position the dot at the appropriate starting point based on sequence
        const positions = ANIMATION_POSITIONS[animationTypeIndex];
        let startPosition;
        
        switch(positionIndex) {
          case 0:
            startPosition = positions.start;
            break;
          case 1:
            startPosition = positions.mid;
            break;
          case 2:
            startPosition = positions.end;
            break;
          default:
            startPosition = positions.start;
        }
        
        // Explicitly set the position
        dot.style.top = `${startPosition}%`;
        
        // Show the dot
        dot.classList.add('visible');
        
        // Determine pause duration between 2 and 4 seconds
        const pauseDuration = Math.random() * 2000 + 2000;
        
        // After pause, move to next position
        const nextTimeout = setTimeout(() => {
          // Update position index to move to next position in sequence
          positionIndex = (positionIndex + 1) % 3;
          
          // Every third move, change animation type
          if (positionIndex === 0) {
            animationTypeIndex = (animationTypeIndex + 1) % ANIMATION_TYPES.length;
          }
          
          // Continue the cycle
          moveToNextPosition();
        }, pauseDuration);
        
        dotAnimationTimeouts.current.push(nextTimeout);
      }, 1000);
      
      dotAnimationTimeouts.current.push(timeout);
    };
    
    // Start the cycle
    moveToNextPosition();
  };
  
  // Animation effect for active section
  useEffect(() => {
    if (itemRefs.current[activeSection]) {
      // Add animation class to active item
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          if (index === activeSection) {
            ref.classList.add('scrollspy-active-animate');
            
            // Remove the animation class after it completes
            setTimeout(() => {
              ref.classList.remove('scrollspy-active-animate');
            }, 1000);
          }
        }
      });
    }
    
    // Update progress on all scrollspy elements
    const progress = ((activeSection + 1) / sections.length) * 100;
    
    if (scrollProgressRef.current) {
      scrollProgressRef.current.style.height = `${progress}%`;
    }
    
    if (socialProgressRef.current) {
      socialProgressRef.current.style.height = `${progress}%`;
    }
    
    if (mobileProgressRef.current) {
      mobileProgressRef.current.style.height = `${progress}%`;
    }
  }, [activeSection, sections.length]);

  // Calculate visible sections based on screen size
  const getVisibleSections = () => {
    if (windowWidth <= 480) {
      // Show fewer dots on mobile
      const totalSections = sections.length;
      const visibleCount = Math.min(totalSections, 5);
      
      // If we have more sections than visible count, create a condensed version
      if (totalSections > visibleCount) {
        const step = Math.ceil(totalSections / visibleCount);
        return sections.filter((_, index) => index % step === 0 || index === totalSections - 1);
      }
    }
    
    return sections;
  };
  
  const isMobile = windowWidth <= 480;

  if (isMobile) {
    return null;
  }

  const visibleSections = getVisibleSections();

  return (
    <>
      {/* Right side social media navigation */}
      <nav className={`scrollspy-nav-right ${!isNavVisible ? 'hidden' : ''}`}>
        <div className="scrollspy-line" ref={socialLineRef}>
          <div className="scrollspy-progress" ref={socialProgressRef}></div>
          <div className="line-dot-ani" ref={rightNavDotsRef}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        
        <div className="social-icons-container">
            {[
              { icon: faFacebook, label: "Facebook", href: "#" },
              { icon: faInstagram, label: "Instagram", href: "#" },
              { icon: faTwitter, label: "Twitter", href: "#" },
              { icon: faPinterest, label: "Pinterest", href: "#" },
              { icon: faTiktok, label: "TikTok", href: "#" },
              { icon: faYoutube, label: "YouTube", href: "#" },
            ].map(({ icon, label, href }) => (
              <div className="social-icon-wrapper—" key={label}>
                <a href={href} className="social-icon" aria-label={label}>
                  <FontAwesomeIcon icon={icon} />
                </a>
                
              </div>
            ))}
        </div>

         {/* Scroll indicators for mobile - visible on smaller screens */}
          <div className={`scroll-indicator d-block d-md-none ${!isNavVisible ? 'hidden' : ''}`}>
            <div className="scroll-line" ref={mobileLineRef}>
              <div className="scroll-progress" ref={mobileProgressRef}></div>
              <div className="line-dot-ani" ref={mobileNavDotsRef}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
            
            {visibleSections.map((section, index) => {
              // Map the condensed index back to the original sections array
              const originalIndex = sections.findIndex(s => s.id === section.id);
              
              return (
                <div 
                  key={section.id}
                  className={`scroll-dot ${originalIndex === activeSection ? 'active' : ''}`}
                  onClick={() => scrollToSection(originalIndex)}
                  aria-label={`Scroll to ${section.title} section`}
                />
              );
            })}
          </div>

      </nav>

     
      
      {/* Left side section navigation */}
      <nav className={`scrollspy-nav-left ${!isNavVisible ? 'hidden' : ''}`} aria-label="Page sections">
        <div className="scrollspy-items">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              className={`scrollspy-item ${index === activeSection ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
              ref={el => itemRefs.current[index] = el}
              role="button"
              aria-label={`Go to ${section.title} section`}
              aria-current={index === activeSection ? 'true' : 'false'}
            >
              <div className="scrollspy-dot" data-section={section.id}>
                <span className="scrollspy-dot-inner"></span>
              </div>
             
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default ScrollSpy;