import { useEffect, useState } from 'react';

/**
 * Hook for responsive design with media queries
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window === 'undefined') {
      return;
    }
    
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handler);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);
  
  return matches;
}

// Predefined media queries for common breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

/**
 * Hook for responsive design with predefined breakpoints
 */
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  return useMediaQuery(breakpoints[breakpoint]);
}

