// Breakpoint values in pixels
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
} as const;

// Media query strings
export const mediaQueries = {
  xs: `@media (max-width: ${breakpoints.sm - 1}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
  md: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  
  // Inclusive ranges
  smAndUp: `@media (min-width: ${breakpoints.sm}px)`,
  mdAndUp: `@media (min-width: ${breakpoints.md}px)`,
  lgAndUp: `@media (min-width: ${breakpoints.lg}px)`,
  
  // Special cases
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)'
};

// Container widths
export const containerMaxWidths = {
  sm: '540px',
  md: '720px',
  lg: '960px',
  xl: '1140px'
};

// Spacing scale (in rem)
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem'
};

// Font sizes
export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem'
};

// Helper functions
export const pxToRem = (px: number, base = 16) => `${px / base}rem`;

export const getBreakpoint = (width: number) => {
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  return 'xl';
};

// Device detection
export const isMobile = () => 
  typeof window !== 'undefined' && window.innerWidth < breakpoints.sm;

export const isTablet = () =>
  typeof window !== 'undefined' && 
  window.innerWidth >= breakpoints.sm && 
  window.innerWidth < breakpoints.lg;

export const isDesktop = () =>
  typeof window !== 'undefined' && window.innerWidth >= breakpoints.lg;

// Grid system
export const grid = {
  columns: 12,
  gutter: '30px',
  container: {
    padding: '15px'
  }
};
