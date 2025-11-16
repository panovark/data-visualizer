import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  applyDocumentTheme,
  getStoredTheme,
  persistTheme,
  subscribeToSystemTheme,
} from "@/theme/themeLoader";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children, defaultTheme = "system" }) => {
  const [theme, setThemeState] = useState(() => getStoredTheme(defaultTheme));

  useEffect(() => {
    applyDocumentTheme(theme);

    if (theme !== "system") {
      return;
    }

    return subscribeToSystemTheme(() => applyDocumentTheme("system"));
  }, [theme]);

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  const setTheme = (value) => {
    setThemeState(value);
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
export default ThemeProvider;
