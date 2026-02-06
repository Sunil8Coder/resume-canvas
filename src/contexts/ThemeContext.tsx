import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ColorTheme = 'blue' | 'emerald' | 'violet' | 'rose' | 'amber' | 'teal' | 'slate';

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'resume4j-color-theme';

export const themeOptions: { id: ColorTheme; label: string; color: string }[] = [
  { id: 'blue', label: 'Ocean Blue', color: '217 91% 60%' },
  { id: 'emerald', label: 'Emerald', color: '160 84% 39%' },
  { id: 'violet', label: 'Violet', color: '263 70% 50%' },
  { id: 'rose', label: 'Rose', color: '347 77% 50%' },
  { id: 'amber', label: 'Amber', color: '38 92% 50%' },
  { id: 'teal', label: 'Teal', color: '174 72% 40%' },
  { id: 'slate', label: 'Slate', color: '215 25% 27%' },
];

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved as ColorTheme) || 'blue';
  });

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  };

  useEffect(() => {
    // Remove all theme classes
    const root = document.documentElement;
    themeOptions.forEach(t => root.classList.remove(`theme-${t.id}`));
    // Add current theme class
    root.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
