import { useEffect, useRef, useState } from 'react';

interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  visibilityThreshold?: number;
  onVisibilityChange?: (target: Element, isVisible: boolean, entry: IntersectionObserverEntry) => void;
}

export const useIntersectionObserver = (
  containerRef: React.RefObject<Element>,
  selectors: string,
  options: IntersectionOptions = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleSections, setVisibleSections] = useState<Element[]>([]);
  const [primaryVisible, setPrimaryVisible] = useState<Element | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const {
      root = containerRef.current,
      rootMargin = '-20% 0px -20% 0px',
      threshold = [0.2, 0.5, 0.8],
      visibilityThreshold = 0.5,
      onVisibilityChange
    } = options;
    
    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Filter visible elements based on intersection ratio
        const visible = entries
          .filter(entry => entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold)
          .map(entry => entry.target);
        
        // Find the element with the highest intersection ratio
        let primary: Element | null = null;
        let maxRatio = 0;
        
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            primary = entry.target;
          }
          
          // Add or remove 'visible' class based on intersection
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else if (entry.intersectionRatio < 0.1) {
            entry.target.classList.remove('visible');
          }
          
          // Call visibility change callback if provided
          if (onVisibilityChange) {
            onVisibilityChange(
              entry.target, 
              entry.isIntersecting, 
              entry
            );
          }
        });
        
        setVisibleSections(visible);
        if (primary) setPrimaryVisible(primary);
      },
      { root, rootMargin, threshold }
    );
    
    // Observe all matching elements
    const container = root === null ? document : root;
    const elements = Array.from(container.querySelectorAll(selectors));
    
    elements.forEach(element => {
      if (observerRef.current) {
        observerRef.current.observe(element);
        
        // Initialize first section as visible
        if (element === elements[0]) {
          element.classList.add('visible');
        }
      }
    });
    
    // Clean up
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef, selectors, options]);
  
  return { visibleSections, primaryVisible };
}; 