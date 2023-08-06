"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface ThemeContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

/**
 * Creates a new theme context with default values.
 */
// @ts-expect-error
const ThemeContext = createContext<ThemeContext>({});

/**
 * Provides the theme context to child components.
 */
export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // Default theme name.
  const defaultTheme = "light";
  // State hook to manage the theme state within the component.
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Returns the current theme context object.
 */
export const useThemeContext = () => useContext(ThemeContext);
