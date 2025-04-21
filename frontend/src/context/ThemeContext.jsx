import React, { createContext, useState, useEffect, useRef } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const appRef = useRef(null);

  useEffect(() => {
    if (appRef.current) {
      if (theme === 'dark') {
        appRef.current.classList.add('dark');
      } else {
        appRef.current.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, appRef }}>
      <div ref={appRef}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
