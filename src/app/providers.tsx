"use client";

import { useEffect, useState, type FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

import { Studio, ThemeProvider, useThemeContext } from "@/components";

const renderer = createDOMRenderer();
const queryClient = new QueryClient();

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorBrandBackground2,
    fontFamily: "Fira Code",
  },
});

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RendererProvider renderer={renderer || createDOMRenderer()}>
          <SSRProvider>
            <WrappedFluentProvider>{children}</WrappedFluentProvider>
          </SSRProvider>
        </RendererProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const WrappedFluentProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const styles = useStyles();
  const { theme } = useThemeContext();
  const currentTheme = theme === "light" ? webLightTheme : webDarkTheme;

  return (
    <FluentProvider theme={currentTheme} className={styles.root}>
      <Studio>{children}</Studio>
    </FluentProvider>
  );
};
