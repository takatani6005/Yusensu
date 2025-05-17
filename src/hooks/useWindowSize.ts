// src/hooks/useWindowSize.ts

import { useState, useEffect, useMemo } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface UseWindowSizeOptions {
  debounceDelay?: number; // ms
  enabled?: boolean;
}

interface WindowSize {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

/**
 * Hook theo dõi kích thước cửa sổ và loại breakpoint (mobile/tablet/desktop).
 * Có hỗ trợ debounce để tránh gọi setState quá nhiều lần.
 *
 * @param options debounceDelay (ms), enabled (bật/tắt observer)
 * @returns { width, height, breakpoint }
 */
const useWindowSize = (
  options: UseWindowSizeOptions = {}
): WindowSize => {
  const { debounceDelay = 150, enabled = true } = options;

  const getBreakpoint = (width: number): Breakpoint => {
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
  };

  const getWindowSize = (): WindowSize => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    const height = typeof window !== 'undefined' ? window.innerHeight : 0;
    const breakpoint = getBreakpoint(width);
    
    return {
      width,
      height,
      breakpoint,
      isMobile: width < 576,
      isTablet: width >= 576 && width < 992,
      isDesktop: width >= 992 && width < 1200,
      isLargeDesktop: width >= 1200
    };
  };

  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize(getWindowSize());
      }, debounceDelay);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceDelay, enabled]);

  return useMemo(() => windowSize, [windowSize]);
};

export default useWindowSize;
