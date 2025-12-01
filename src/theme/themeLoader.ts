const STORAGE_KEY = "trivia-theme";
const DEFAULT_THEME: ThemeOption = "system";

type ThemeOption = "light" | "dark" | "system";

const isWindowDefined = () => typeof window !== "undefined";

const getStoredTheme = (fallback: ThemeOption = DEFAULT_THEME): ThemeOption => {
  if (!isWindowDefined()) {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
    return fallback;
  } catch {
    return fallback;
  }
};

const persistTheme = (value: ThemeOption) => {
  if (!isWindowDefined()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ignore persistence issues
  }
};

const prefersDark = (): boolean => {
  if (!isWindowDefined()) {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const resolveTheme = (value: ThemeOption): Exclude<ThemeOption, "system"> => {
  if (value === "system") {
    return prefersDark() ? "dark" : "light";
  }
  return value;
};

const applyDocumentTheme = (value: ThemeOption) => {
  if (typeof document === "undefined") {
    return;
  }

  const resolved = resolveTheme(value);
  const root = document.documentElement;

  root.classList.toggle("dark", resolved === "dark");
  root.dataset.theme = value;
  root.style.colorScheme = resolved;
};

const initializeTheme = (fallback: ThemeOption = DEFAULT_THEME): ThemeOption => {
  const storedTheme = getStoredTheme(fallback);
  applyDocumentTheme(storedTheme);
  return storedTheme;
};

const subscribeToSystemTheme = (callback: (theme: ThemeOption) => void) => {
  if (!isWindowDefined()) {
    return () => {};
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => callback(prefersDark() ? "dark" : "light");

  media.addEventListener("change", handler);
  return () => media.removeEventListener("change", handler);
};

export {
  applyDocumentTheme,
  getStoredTheme,
  initializeTheme,
  persistTheme,
  resolveTheme,
  subscribeToSystemTheme,
};
