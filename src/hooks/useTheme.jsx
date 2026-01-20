import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use dark theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

  const value = {
    theme: "dark",
    isDark: true,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
