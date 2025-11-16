const STORAGE_KEY = "trivia-theme";
const DEFAULT_THEME = "system";

const isWindowDefined = () => typeof window !== "undefined";

const getStoredTheme = (fallback = DEFAULT_THEME) => {
  if (!isWindowDefined()) {
    return fallback;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? fallback;
  } catch {
    return fallback;
  }
};

const persistTheme = (value) => {
  if (!isWindowDefined()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ignore persistence issues
  }
};

const prefersDark = () => {
  if (!isWindowDefined()) {
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
  root.style.colorScheme = resolved;
};

const initializeTheme = (fallback = DEFAULT_THEME) => {
  const storedTheme = getStoredTheme(fallback);
  applyDocumentTheme(storedTheme);
  return storedTheme;
};

const subscribeToSystemTheme = (callback) => {
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
