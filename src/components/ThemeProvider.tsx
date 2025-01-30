'use client';

import * as React from 'react';

type Theme = 'light' | 'dark' | 'grass' | 'dusk' | 'solarized' | 'ocean' | 'sepia' | 'nord';
type Font = 'geist-mono' | 'fira-code';

interface ThemeContextType {
  theme: Theme;
  font: Font;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'dark',
  font: 'geist-mono',
  setTheme: () => {},
  setFont: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>('dark');
  const [font, setFont] = React.useState<Font>('geist-mono');

  React.useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    document.body.classList.add(`font-use-${font}`);
  }, [theme, font]);

  const value = React.useMemo(
    () => ({
      theme,
      font,
      setTheme,
      setFont,
    }),
    [theme, font]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 