"use client";

import { Suspense, useState, FC } from "react";
import { SettingsRegular } from "@fluentui/react-icons";
import {
  TabList,
  Tab,
  TabListProps,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import { useRouter, usePathname } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";

import { Loading, ErrorFallback, Header } from "@/components";
import { DeltalakeIcon, GraphQLIcon, DeltaSharingIcon } from "@/icons";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,
    fontFamily: "Fira Code, monospace",
    overflowX: "hidden",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  body: {
    widht: "100%",
    display: "flex",
    flexDirection: "row",
    ...shorthands.flex(1),
  },
  content: {
    height: "100%",
    display: "flex",
    flexGrow: 1,
  },
  sidebar: {
    height: "100%",
    width: "68px",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: tokens.colorNeutralBackground6,
    backgroundColor: tokens.colorNeutralBackground4,
  },
});

export const Studio: FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();
  const pathname = usePathname();

  const segments = pathname.split("/");
  const rootPath = segments.length < 2 ? "/" : `/${segments[1]}`;

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.body}>
        <div className={classes.sidebar}>
          <TabList
            size="large"
            vertical
            selectedValue={rootPath}
            role="navigation"
          >
            <Link href={"/"}>
              <Tab id="studio" value="/">
                <SettingsRegular fontSize={38} />
              </Tab>
            </Link>
            <Link href={"/delta-sharing"}>
              <Tab
                id="delta-sharing"
                value="/delta-sharing"
                style={{ height: "64px", width: "64px", paddingBottom: 0 }}
              >
                <DeltaSharingIcon size={45} />
              </Tab>
            </Link>
            <Link href={"/delta"}>
              <Tab
                id="delta"
                value="/delta"
                style={{ height: "64px", width: "64px", paddingBottom: 4 }}
              >
                <DeltalakeIcon height={38} width={38} />
              </Tab>
            </Link>
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
