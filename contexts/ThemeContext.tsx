import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('toro-theme') as Theme;
        if (savedTheme && (savedTheme === Theme.Light || savedTheme === Theme.Dark)) {
            return savedTheme;
        }
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? Theme.Dark : Theme.Light;
    }
    return Theme.Dark; // Default for non-browser environments
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.Dark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
    try {
        localStorage.setItem('toro-theme', theme);
    } catch (e) {
        console.error("Failed to save theme to localStorage", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.Light ? Theme.Dark : Theme.Light));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};