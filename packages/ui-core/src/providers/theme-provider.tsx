import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  /**
   * Current theme
   */
  theme: Theme;
  
  /**
   * Set theme
   */
  setTheme: (theme: Theme) => void;
  
  /**
   * Is dark mode active
   */
  isDarkMode: boolean;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  /**
   * Children components
   */
  children: ReactNode;
  
  /**
   * Default theme
   */
  defaultTheme?: Theme;
  
  /**
   * Storage key for theme
   */
  storageKey?: string;
}

/**
 * Provider component for theme
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme;
    }
    
    // Try to get theme from localStorage
    const storedTheme = localStorage.getItem(storageKey);
    return (storedTheme as Theme) || defaultTheme;
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    return theme === 'dark';
  });
  
  // Update theme in localStorage and apply to document
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
  };
  
  // Update dark mode based on theme and system preference
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    const updateDarkMode = () => {
      if (theme === 'system') {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemIsDark);
        document.documentElement.classList.toggle('dark', systemIsDark);
      } else {
        const isDark = theme === 'dark';
        setIsDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
      }
    };
    
    updateDarkMode();
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateDarkMode();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

