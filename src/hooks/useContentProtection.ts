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
    if (options.all) {
      applyAllProtections();
      return;
    }
    
    if (options.preventRightClick) 
      preventRightClick();
    
    if (options.preventCopy) 
      preventCopy();
    
    
    if (options.preventCut) 
      preventCut();
    
    
    if (options.preventSelection) 
      preventSelection();
    
    
    if (options.preventDrag) 
      preventDrag();

    
    
  }, [options]);
}; 