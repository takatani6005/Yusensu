import { useWindowSizeContext } from '../context/WindowSizeContext';
import { breakpoints } from '../utils/responsive';

interface ResponsiveLayoutHook {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  currentBreakpoint: string;
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  isTouch: boolean;
  prefersDarkMode: boolean;
  prefersReducedMotion: boolean;
}

export const useResponsiveLayout = (): ResponsiveLayoutHook => {
  const { width, height, breakpoint } = useWindowSizeContext();

  // Detect orientation
  const isPortrait = height > width;
  const isLandscape = !isPortrait;

  // Detect touch capability
  const isTouch = typeof window !== 'undefined' && 
    (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    ((navigator as any).msMaxTouchPoints > 0));

  // Media preferences
  const prefersDarkMode = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    isMobile: width < breakpoints.sm,
    isTablet: width >= breakpoints.sm && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg && width < breakpoints.xl,
    isLargeDesktop: width >= breakpoints.xl,
    currentBreakpoint: breakpoint,
    width,
    height,
    isPortrait,
    isLandscape,
    isTouch,
    prefersDarkMode,
    prefersReducedMotion
  };
};

export default useResponsiveLayout;
