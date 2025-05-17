/**
 * Utility functions to prevent content copying
 */

// Prevent right click
export const preventRightClick = () => {
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    return false;
  });
};

// Prevent copy 
export const preventCopy = () => {
  document.addEventListener('copy', (event) => {
    event.preventDefault();
    return false;
  });
  
  // For older browsers
  document.oncopy = () => false;
};

// Prevent cut
export const preventCut = () => {
  document.addEventListener('cut', (event) => {
    event.preventDefault();
    return false;
  });
};

// Prevent text selection
export const preventSelection = () => {
  document.addEventListener('selectstart', (event) => {
    event.preventDefault();
    return false;
  });
};

// Prevent drag
export const preventDrag = () => {
  document.addEventListener('dragstart', (event) => {
    event.preventDefault();
    return false;
  });
};

// Apply all protections
export const applyAllProtections = () => {
  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (!isMobile) {
    preventCut();
    preventSelection();
    preventDrag();
    
    // Disable keyboard shortcuts only on desktop
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && 
          (event.key === 'c' || event.key === 'x')) {
        event.preventDefault();
        return false;
      }
    });
  }
  
  // Add mobile detection class
  if (isMobile) {
    document.documentElement.classList.add('is-mobile');
  }
};