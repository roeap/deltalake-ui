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

// @ts-expect-error
const ThemeContext = createContext<ThemeContext>({});

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const defaultTheme = "dark";
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
