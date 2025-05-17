import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface ScrollContextType {
  isScrolling: boolean;
  activeSection: number;
  setActiveSection: (index: number) => void;
  scrollToSection: (index: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  scrollLineRef: React.RefObject<HTMLDivElement>;
  scrollProgressRef: React.RefObject<HTMLDivElement>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
  totalSections: number;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children, totalSections }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    
    // Add flag to disable snap during programmatic scrolling
    containerRef.current.classList.add('scrolling-in-progress');
    
    // Calculate position - container might be the window or a specific element
    const container = containerRef.current;
    const sections = container.querySelectorAll('.snap-section, .footer-snap-section');
    
    if (sections[index]) {
      const sectionTop = sections[index].getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
      const offset = sectionTop - containerTop;
      
      // Set scrolling state
      setIsScrolling(true);
      
      // Smooth scroll to the section
      container.scrollBy({
        top: offset,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(index);
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Reset scrolling state after animation completes
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        container.classList.remove('scrolling-in-progress');
      }, 1000); // Adjust timing to match scroll duration
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const contextValue: ScrollContextType = {
    isScrolling,
    activeSection,
    setActiveSection,
    scrollToSection,
    containerRef,
    scrollLineRef,
    scrollProgressRef
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}; 