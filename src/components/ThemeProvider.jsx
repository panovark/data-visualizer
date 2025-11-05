import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "trivia-theme";
const ThemeContext = createContext(null);

const getStoredTheme = (fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ?? fallback;
  } catch {
    return fallback;
  }
};

const prefersDark = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const resolveTheme = (value) => {
  if (value === "system") {
    return prefersDark() ? "dark" : "light";
  }
  return value;
};

const applyDocumentTheme = (value) => {
  if (typeof document === "undefined") {
    return;
  }

  const resolved = resolveTheme(value);
  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = value;
};

const ThemeProvider = ({ children, defaultTheme = "system" }) => {
  const [theme, setThemeState] = useState(() => getStoredTheme(defaultTheme));

  useEffect(() => {
    applyDocumentTheme(theme);

    if (typeof window === "undefined") {
      return;
    }

    if (theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyDocumentTheme("system");

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore persistence errors (e.g. private mode).
    }
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
