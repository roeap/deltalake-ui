"use client";

import { Suspense, useState, FC } from "react";
import { SettingsRegular } from "@fluentui/react-icons";
import {
  TabList,
  Tab,
  TabListProps,
  makeStyles,
  tokens,
  Title3,
} from "@fluentui/react-components";
import { useRouter } from "next/navigation";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { Loading } from "@/components";
import { DeltalakeIcon, GraphQLIcon, DeltaSharingIcon } from "@/icons";

const TAB_NAV_HEIGHT = "64px";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,
    fontFamily: "Fira Code, monospace",
    overflowX: "hidden",
    overflowY: "hidden",
  },
  body: {
    height: `calc(100vh - ${TAB_NAV_HEIGHT})`,
    widht: "100%",
    display: "flex",
    flexDirection: "row",
  },
  content: {
    height: `calc(100vh - ${TAB_NAV_HEIGHT})`,
    display: "flex",
    flexGrow: 1,
  },
  sidebar: {
    height: `calc(100vh - ${TAB_NAV_HEIGHT})`,
    width: "68px",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: tokens.colorNeutralForeground4,
  },
  header: {
    height: TAB_NAV_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    paddingLeft: tokens.spacingVerticalL,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralForeground4,
  },
  firaLabel: { fontFamily: "Fira Code, monospace" },
  connected: { color: tokens.colorPaletteLightGreenForeground1 },
});

const Header: FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.header}>
      <Title3 className={styles.firaLabel}>Lakehouse Studio</Title3>
    </div>
  );
};

const ErrorFallback: FC<FallbackProps> = ({ error }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};

export const Studio: FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState("/");

  const onTabSelect: TabListProps["onTabSelect"] = (_event, data) => {
    setSelectedValue(data.value as string);
    router.push(data.value as string);
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.body}>
        <div className={classes.sidebar}>
          <TabList
            size="large"
            vertical
            selectedValue={selectedValue}
            onTabSelect={onTabSelect}
            defaultValue={"/"}
          >
            <Tab id="studio" value="/">
              <SettingsRegular fontSize={38} />
            </Tab>
            <Tab
              id="delta-sharing"
              value="/delta-sharing"
              style={{ height: "64px", width: "64px", paddingBottom: 0 }}
            >
              <DeltaSharingIcon size={45} />
            </Tab>
            <Tab
              id="delta"
              value="/delta"
              style={{ height: "64px", width: "64px", paddingBottom: 4 }}
            >
              <DeltalakeIcon height={38} width={38} />
            </Tab>
            <Tab
              id="graphql"
              value="/graphql"
              style={{ height: "64px", width: "64px", paddingBottom: 4 }}
            >
              <GraphQLIcon height={38} width={38} />
            </Tab>
          </TabList>
        </div>
        <div className={classes.content}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
