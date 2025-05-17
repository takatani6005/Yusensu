import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import { sectionData } from '../data/homeData';

// Import all sections from index file
import {
  HeroSection,
  AboutSection,
  FeaturedSection,
  TestimonialsSection,
  GallerySection,
  MediaHubSection,
  ReservationSection
 
} from '../components/sections';

// Navigation
import ScrollSpy from '../components/ScrollSpy';


const Home: React.FC = () => {
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const sections = sectionData.map(section => section.id);
  
  // Drag scrolling state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [lastDragTime, setLastDragTime] = useState(0);
  const [dragVelocity, setDragVelocity] = useState({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  // Calculate scroll progress for the vertical line
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;
    
    const calculateProgress = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
      
      // Update the line height for visual feedback
      if (scrollLineRef.current && scrollProgressRef.current) {
        const totalSections = sections.length - 1;
        const lineHeight = totalSections * 30 + (totalSections - 1) * 30; // dots + gaps
        scrollLineRef.current.style.height = `${lineHeight}px`;
        scrollProgressRef.current.style.height = `${(progress / 100) * lineHeight}px`;
      }
    };
    
    calculateProgress(); // Initial calculation
    container.addEventListener('scroll', calculateProgress);
    return () => {
      container.removeEventListener('scroll', calculateProgress);
    };
  }, [sections.length]);

  // Track scroll position to update active section
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      
      // Get all snap section elements
      const sectionElements = container.querySelectorAll('.snap-section, .footer-snap-section');
      
      // Find which section is currently most visible in the viewport
      let currentSection = 0;
      let maxVisibleHeight = 0;
      
      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          currentSection = index;
        }
        
        // Apply parallax effect to section backgrounds
        const parallaxOffset = rect.top * 0.2; // Adjust the multiplier for more/less parallax effect
        
        // Get child elements for parallax effect
        const sectionContent = section.querySelectorAll('.parallax-content');
        sectionContent.forEach((content: Element, i: number) => {
          // Different parallax speeds for different elements
          const speed = 0.1 + (i * 0.05);
          const contentElement = content as HTMLElement;
          contentElement.style.transform = `translateY(${parallaxOffset * speed}px)`;
        });
      });
      
      setActiveSection(currentSection);
      
      // Update scroll progress
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = (scrollPosition / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Setup Intersection Observer for section transitions
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;
    
    // Options for the Intersection Observer
    const options = {
      root: container,
      rootMargin: '-20% 0px -20% 0px', // Add margins to trigger slightly before section is fully in view
      threshold: 0.3 // Trigger when 30% of the section is visible
    };
    
    // Callback for when intersection changes
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        // Add or remove the 'visible' class based on intersection
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Optional: Only remove the class if it's far out of view
          if (entry.intersectionRatio < 0.1) {
            entry.target.classList.remove('visible');
          }
        }
      });
    };
    
    // Create the observer
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Observe all sections
    const sections = container.querySelectorAll('.snap-section, .footer-snap-section');
    sections.forEach(section => {
      observer.observe(section);
      
      // Initial setup - make sure the first section is visible immediately
      if (section === sections[0]) {
        section.classList.add('visible');
      }
    });
    
    return () => {
      // Clean up the observer when component unmounts
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Apply momentum scrolling when drag ends
  const applyMomentum = () => {
    const container = snapContainerRef.current;
    if (!container || !dragVelocity.x && !dragVelocity.y) return;
    
    // Apply momentum with decreasing velocity
    let velocity = { ...dragVelocity };
    const friction = 0.95; // Adjust for less or more momentum
    
    const animate = () => {
      // Reduce velocity by friction
      velocity.x *= friction;
      velocity.y *= friction;
      
      // Apply velocity to scroll position
      container.scrollLeft -= velocity.x;
      container.scrollTop -= velocity.y;
      
      // Stop animation when velocity becomes very small
      if (Math.abs(velocity.x) < 0.5 && Math.abs(velocity.y) < 0.5) {
        // When momentum ends, snap to nearest section
        const sectionElements = container.querySelectorAll('.snap-section, .footer-snap-section');
        let closestSection = 0;
        let minDistance = Infinity;
        
        sectionElements.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = index;
          }
        });
        
        // Only snap if we're not very close already
        if (minDistance > 50) {
          setTimeout(() => {
            scrollToSection(closestSection);
          }, 10);
        }
        
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }
        return;
      }
      
      animationFrame.current = requestAnimationFrame(animate);
    };
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    
    animationFrame.current = requestAnimationFrame(animate);
  };

  // Implement click and drag scrolling
  useEffect(() => {
    const container = snapContainerRef.current;
    if (!container) return;

    // Mouse events for desktop
    const onMouseDown = (e: MouseEvent) => {
      // Cancel any ongoing momentum animation
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }
      
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setStartY(e.pageY - container.offsetTop);
      setScrollLeft(container.scrollLeft);
      setScrollTop(container.scrollTop);
      lastPosition.current = { x: e.pageX, y: e.pageY };
      setLastDragTime(Date.now());
      container.classList.add('dragging');
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      container.classList.remove('dragging');
      
      // Calculate final velocity for momentum
      const timeElapsed = Date.now() - lastDragTime;
      if (timeElapsed < 100) { // Only apply momentum if the drag was quick
        applyMomentum();
      } else {
        // When drag ends slowly, snap to nearest section
        const sectionElements = container.querySelectorAll('.snap-section, .footer-snap-section');
        let closestSection = 0;
        let minDistance = Infinity;
        
        sectionElements.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = index;
          }
        });
        
        // Only snap if we're not very close already
        if (minDistance > 50) {
          setTimeout(() => {
            scrollToSection(closestSection);
          }, 10);
        }
      }
    };

    const onMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        container.classList.remove('dragging');
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      
      // Calculate how far the mouse has moved
      const walkX = (x - startX) * 2; // Adjust the multiplier for sensitivity
      const walkY = (y - startY) * 2; // Adjust the multiplier for sensitivity
      
      // Scroll the container
      container.scrollLeft = scrollLeft - walkX;
      container.scrollTop = scrollTop - walkY;
      
      // Calculate velocity for momentum scrolling
      const now = Date.now();
      const elapsed = now - lastDragTime;
      
      if (elapsed > 0) {
        const velocityX = (lastPosition.current.x - e.pageX) / elapsed * 15; // Adjust multiplier for stronger/weaker momentum
        const velocityY = (lastPosition.current.y - e.pageY) / elapsed * 15;
        
        setDragVelocity({ x: velocityX, y: velocityY });
        lastPosition.current = { x: e.pageX, y: e.pageY };
        setLastDragTime(now);
      }
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Cancel any ongoing momentum animation
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }
        
        setIsDragging(true);
        setStartX(e.touches[0].clientX - container.offsetLeft);
        setStartY(e.touches[0].clientY - container.offsetTop);
        setScrollLeft(container.scrollLeft);
        setScrollTop(container.scrollTop);
        lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setLastDragTime(Date.now());
        container.classList.add('dragging');
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      
      // Prevent default only when we're actively dragging
      // This prevents issues with other touch interactions
      e.preventDefault();
      
      const x = e.touches[0].clientX - container.offsetLeft;
      const y = e.touches[0].clientY - container.offsetTop;
      
      // Calculate how far the touch has moved
      const walkX = (x - startX) * 2; // Adjust the multiplier for sensitivity
      const walkY = (y - startY) * 2; // Adjust the multiplier for sensitivity
      
      // Scroll the container
      container.scrollLeft = scrollLeft - walkX;
      container.scrollTop = scrollTop - walkY;
      
      // Calculate velocity for momentum scrolling
      const now = Date.now();
      const elapsed = now - lastDragTime;
      
      if (elapsed > 0) {
        const velocityX = (lastPosition.current.x - e.touches[0].clientX) / elapsed * 15;
        const velocityY = (lastPosition.current.y - e.touches[0].clientY) / elapsed * 15;
        
        setDragVelocity({ x: velocityX, y: velocityY });
        lastPosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setLastDragTime(now);
      }
    };

    const onTouchEnd = () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      container.classList.remove('dragging');
      
      // Calculate final velocity for momentum
      const timeElapsed = Date.now() - lastDragTime;
      if (timeElapsed < 100) { // Only apply momentum if the drag was quick
        applyMomentum();
      } else {
        // When drag ends slowly, snap to nearest section
        const sectionElements = container.querySelectorAll('.snap-section, .footer-snap-section');
        let closestSection = 0;
        let minDistance = Infinity;
        
        sectionElements.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = index;
          }
        });
        
        // Only snap if we're not very close already
        if (minDistance > 50) {
          setTimeout(() => {
            scrollToSection(closestSection);
          }, 10);
        }
      }
    };
    
    // Add event listeners for mouse events
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousemove', onMouseMove);
    
    // Add event listeners for touch events
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    return () => {
      // Remove mouse event listeners
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousemove', onMouseMove);
      
      // Remove touch event listeners
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      
      // Clean up any pending animation frame
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isDragging, startX, startY, scrollLeft, scrollTop, lastDragTime, dragVelocity]);

  // Scroll to section when indicator is clicked
  const scrollToSection = (index: number) => {
    if (snapContainerRef.current) {
      // Get all snap section elements
      const sections = snapContainerRef.current.querySelectorAll('.snap-section, .footer-snap-section');
      
      if (sections[index]) {
        // Add transition class to animate the scroll
        document.body.classList.add('is-scrolling');
        
        // Calculate the scroll target position
        const targetElement = sections[index] as HTMLElement;
        const targetPosition = targetElement.offsetTop;
        
        // Get current section for directional animations
        const currentSection = activeSection;
        
        // Add appropriate transition classes based on scroll direction
        if (currentSection < index) {
          // Scrolling down
          if (targetElement.previousElementSibling) {
            targetElement.previousElementSibling.classList.add('scroll-transition-exit');
          }
          targetElement.classList.add('scroll-transition-enter');
        } else if (currentSection > index) {
          // Scrolling up
          if (targetElement.nextElementSibling) {
            targetElement.nextElementSibling.classList.add('scroll-transition-exit');
          }
          targetElement.classList.add('scroll-transition-enter');
        }
        
        // Perform the smooth scroll
        snapContainerRef.current.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Clean up animation classes after transition completes
        setTimeout(() => {
          document.body.classList.remove('is-scrolling');
          document.querySelectorAll('.scroll-transition-enter, .scroll-transition-exit').forEach(el => {
            el.classList.remove('scroll-transition-enter', 'scroll-transition-exit');
          });
        }, 600);  // slightly longer than the CSS animation duration
      }
    }
  };

  // Ensure focus on snap container for keyboard navigation
  useEffect(() => {
    if (snapContainerRef.current) {
      snapContainerRef.current.focus();
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (activeSection > 0) {
          scrollToSection(activeSection - 1);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (activeSection < sections.length - 1) {
          scrollToSection(activeSection + 1);
        }
        break;
      case 'Home':
        e.preventDefault();
        scrollToSection(0);
        break;
      case 'End':
        e.preventDefault();
        scrollToSection(sections.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="home-wrapper">
        <div 
          className={`snap-container ${isDragging ? 'dragging' : ''}`}
          ref={snapContainerRef}
          tabIndex={0} // Make focusable for keyboard navigation
          onKeyDown={handleKeyDown}
        >

          
          {/* Hero Section */}
          <HeroSection scrollToSection={scrollToSection} />
          
          {/* About Section */}
          <AboutSection />

          {/* Featured Dishes Section */}
          <FeaturedSection />

          {/* Testimonials Section */}
          <TestimonialsSection 
            scrollToSection={scrollToSection} 
            mediaIndex={sections.indexOf('media')} 
          />

          {/* Gallery Section */}
          <GallerySection 
            scrollToSection={scrollToSection} 
            mediaIndex={sections.indexOf('media')} 
          />

          {/* Media Hub Section */}
          <MediaHubSection />

          {/* Contact Section */}
          {/* <ContactSection /> */}
          <ReservationSection/>
          
          {/* Footer Section - Make it a proper snap section */}
          <Footer />
        </div>

        {/* ScrollSpy Navigation */}
        <ScrollSpy 
          sections={sectionData}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          scrollLineRef={scrollLineRef}
          scrollProgressRef={scrollProgressRef}
        />
      </div>
    </>
  );
};

export default Home; 