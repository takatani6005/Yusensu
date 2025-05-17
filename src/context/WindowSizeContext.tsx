// src/context/WindowSizeContext.tsx
import React, { createContext, useContext } from 'react';
import useWindowSize from '../hooks/useWindowSize';

interface WindowSizeContextType {
  width: number;
  height: number;
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

const WindowSizeContext = createContext<WindowSizeContextType | undefined>(undefined);

interface WindowSizeProviderProps {
  children: React.ReactNode;
}

export const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({ children }) => {
  const windowSize = useWindowSize({ debounceDelay: 100 });

  return (
    <WindowSizeContext.Provider value={windowSize}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export const useWindowSizeContext = (): WindowSizeContextType => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error('useWindowSizeContext must be used within a WindowSizeProvider');
  }
  return context;
};

export default WindowSizeProvider;
