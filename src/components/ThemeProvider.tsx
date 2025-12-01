import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyDocumentTheme,
  getStoredTheme,
  persistTheme,
  subscribeToSystemTheme,
} from "@/theme/themeLoader";

type ThemeOption = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: ThemeOption;
  setTheme: (value: ThemeOption) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeOption;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeOption>(() => {
    const stored = getStoredTheme(defaultTheme);
    return stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : "system";
  });

  useEffect(() => {
    applyDocumentTheme(theme);

    if (theme !== "system") {
      return undefined;
    }

    return subscribeToSystemTheme(() => applyDocumentTheme("system"));
  }, [theme]);

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  const setTheme = (value: ThemeOption) => {
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

const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
export default ThemeProvider;
