"use client";

// Import necessary dependencies from 'react'
import { useEffect, useState } from "react";
import { ThemeProvider, useThemeContext } from "./ThemeProvider";
import {
  createDOMRenderer,
  RendererProvider,
  FluentProvider,
  SSRProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

// Create a DOM renderer for Fluent UI.
const renderer = createDOMRenderer();

/**
 * A custom style class for Fluent UI components.
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
  },
});

/**
 * Providers component.
 *
 * This component wraps other components with a set of providers
 * for Fluent UI, SSR, and a custom renderer.
 */
export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <ThemeProvider>
      <RendererProvider renderer={renderer || createDOMRenderer()}>
        <SSRProvider>
          <WrappedFluentProvider>{children}</WrappedFluentProvider>
        </SSRProvider>
      </RendererProvider>
    </ThemeProvider>
  );
}

/**
 * WrappedFluentProvider component.
 *
 * This component wraps the FluentProvider with the theme context provided
 * by the ThemeProvider. It is used to ensure that the theme value
 * is available and properly passed to the FluentProvider.
 */
const WrappedFluentProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const styles = useStyles();
  const { theme } = useThemeContext();
  const currentTheme = theme === "light" ? webLightTheme : webDarkTheme;

  return (
    <FluentProvider theme={currentTheme} className={styles.root}>
      {children}
    </FluentProvider>
  );
};
