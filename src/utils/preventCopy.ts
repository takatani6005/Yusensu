/**
 * Utility functions to prevent content copying
 */

// Prevent right click
export const preventRightClick = () => {
  const handler = (event: Event) => {
    event.preventDefault();
    return false;
  };
  
  document.addEventListener('contextmenu', handler);
  return () => document.removeEventListener('contextmenu', handler);
};

// Prevent copy 
export const preventCopy = () => {
  const handler = (event: Event) => {
    event.preventDefault();
    return false;
  };
  
  document.addEventListener('copy', handler);
  // For older browsers
  document.oncopy = () => false;
  
  return () => {
    document.removeEventListener('copy', handler);
    document.oncopy = null;
  };
};

// Prevent cut
export const preventCut = () => {
  const handler = (event: Event) => {
    event.preventDefault();
    return false;
  };
  
  document.addEventListener('cut', handler);
  return () => document.removeEventListener('cut', handler);
};

// Prevent text selection
export const preventSelection = () => {
  const handler = (event: Event) => {
    event.preventDefault();
    return false;
  };
  
  document.addEventListener('selectstart', handler);
  return () => document.removeEventListener('selectstart', handler);
};

// Prevent drag
export const preventDrag = () => {
  const handler = (event: Event) => {
    event.preventDefault();
    return false;
  };
  
  document.addEventListener('dragstart', handler);
  return () => document.removeEventListener('dragstart', handler);
};

// Apply all protections
export const applyAllProtections = () => {
  const cleanups = [
    preventRightClick(),
    preventCopy(),
    preventCut(),
    preventSelection(),
    preventDrag()
  ];
  
  return () => cleanups.forEach(cleanup => cleanup());
};