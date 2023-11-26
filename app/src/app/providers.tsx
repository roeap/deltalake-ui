"use client";

import { useEffect, useState, type FC, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransportProvider } from "@connectrpc/connect-query";
import { createConnectTransport } from "@connectrpc/connect-web";
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

import { Studio } from "./Studio";
import { ThemeProvider, useThemeContext } from "@/components";

const renderer = createDOMRenderer();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const useStyles = makeStyles({
  root: {
    fontFamily: "Fira Code",
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const transport = useMemo(
    () =>
      createConnectTransport({
        baseUrl:
          typeof window !== "undefined" ? `${window.location.origin}/api` : "",
      }),
    []
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RendererProvider renderer={renderer || createDOMRenderer()}>
            <SSRProvider>
              <WrappedFluentProvider>{children}</WrappedFluentProvider>
            </SSRProvider>
          </RendererProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </TransportProvider>
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
