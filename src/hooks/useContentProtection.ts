import { useEffect } from 'react';
import { 
  preventRightClick, 
  preventCopy, 
  preventCut, 
  preventSelection,
  preventDrag,
  applyAllProtections
} from '../utils/preventCopy';

interface ContentProtectionOptions {
  preventRightClick?: boolean;
  preventCopy?: boolean;
  preventCut?: boolean;
  preventSelection?: boolean;
  preventDrag?: boolean;
  all?: boolean;
}

/**
 * React hook to apply content protection measures
 * @param options Object with protection options to apply
 */
export const useContentProtection = (options: ContentProtectionOptions = {}) => {
  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];
    
    if (options.all) {
      const cleanup = applyAllProtections();
      cleanupFunctions.push(cleanup);
    } else {
      if (options.preventRightClick) {
        cleanupFunctions.push(preventRightClick());
      }
  
      if (options.preventCopy) {
        cleanupFunctions.push(preventCopy());
      }
  
      if (options.preventCut) {
        cleanupFunctions.push(preventCut());
      }
  
      if (options.preventSelection) {
        cleanupFunctions.push(preventSelection());
      }
  
      if (options.preventDrag) {
        cleanupFunctions.push(preventDrag());
      }
    }

    // Cleanup function that runs when component unmounts or options change
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [options.all, options.preventRightClick, options.preventCopy, options.preventCut, options.preventSelection, options.preventDrag]);
};