import { useEffect, useRef, useState } from 'react';

interface ScrollOptions {
  threshold?: number;
  debounceTime?: number;
  snapToSections?: boolean;
  onScroll?: (progress: number, direction: 'up' | 'down') => void;
  onSectionChange?: (index: number) => void;
}

export const useScrollBehavior = (
  containerRef: React.RefObject<HTMLElement>,
  selector: string = '.snap-section, .footer-snap-section',
  options: ScrollOptions = {}
) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTop = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Default options
  const {
    threshold = 0.5,
    debounceTime = 150,
    snapToSections = true,
    onScroll,
    onSectionChange
  } = options;
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      // Get scroll info
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1) * 100;
      
      // Determine scroll direction
      const direction = scrollTop > lastScrollTop.current ? 'down' : 'up';
      lastScrollTop.current = scrollTop;
      
      // Update state
      setScrollProgress(progress);
      setScrollDirection(direction);
      setIsScrolling(true);
      
      // Call onScroll callback if provided
      if (onScroll) {
        onScroll(progress, direction);
      }
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set timeout to handle end of scrolling
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        
        // Snap to closest section if enabled
        if (snapToSections) {
          findClosestSection();
        }
      }, debounceTime);
    };
    
    // Function to snap to closest section
    const findClosestSection = () => {
      // Don't snap if user is actively scrolling
      if (isScrolling) return;
      
      const sections = Array.from(container.querySelectorAll(selector));
      let closestSection = 0;
      let minDistance = Infinity;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerRect.top);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = index;
        }
      });
      
      // Don't update if we're already at the closest section
      if (currentSection !== closestSection) {
        setCurrentSection(closestSection);
        
        // Call onSectionChange callback if provided
        if (onSectionChange) {
          onSectionChange(closestSection);
        }
        
        // Scroll to the section
        sections[closestSection].scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
    
    // Add event listener
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [containerRef, selector, threshold, debounceTime, snapToSections, onScroll, onSectionChange, isScrolling]);
  
  // Function to scroll to a specific section
  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    const sections = Array.from(container.querySelectorAll(selector));
    if (index >= 0 && index < sections.length) {
      // Disable snap during programmatic scrolling
      container.classList.add('scrolling-in-progress');
      
      // Update state
      setCurrentSection(index);
      setIsScrolling(true);
      
      // Smooth scroll to section
      sections[index].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Call onSectionChange callback if provided
      if (onSectionChange) {
        onSectionChange(index);
      }
      
      // Reset scrolling state after animation completes
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        container.classList.remove('scrolling-in-progress');
      }, 1000);
    }
  };
  
  return {
    scrollProgress,
    scrollDirection,
    currentSection,
    isScrolling,
    scrollToSection
  };
}; 