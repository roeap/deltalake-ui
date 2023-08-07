"use client";

import { useState, type FC, useCallback, useRef, useEffect } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  mergeClasses,
} from "@fluentui/react-components";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable";

import { AddServerCard } from "./AddServerCard";
import { DeltaServerCard } from "./DeltaServerCard";
import { SharingServerDetails, SharingContext } from "@/components";
import { DeltaSharingClient } from "@/clients";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  drawerHeader: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  drawerContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground3,
  },
  drawerResizer: {
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralBackground6),

    width: "8px",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    cursor: "col-resize",
    resize: "horizontal",

    ":hover": {
      borderRightWidth: "4px",
      borderRightColor: tokens.colorBrandForeground1,
    },
  },
  drawerResizing: {
    borderRightWidth: "4px",
    borderRightColor: tokens.colorBrandForeground1,
  },
});

const servers = {
  "1": {
    name: "Production data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
  "2": {
    name: "Business data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
};

const DeltaSharing: FC = () => {
  const styles = useStyles();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(360);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize: (ev: MouseEvent) => void = useCallback(
    (ev) => {
      const { clientX } = ev;
      requestAnimationFrame(() => {
        if (isResizing && sidebarRef.current) {
          setSidebarWidth(
            clientX - sidebarRef.current.getBoundingClientRect().left
          );
        }
      });
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const [client] = useState(
    new DeltaSharingClient({ baseUrl: "http://localhost:8080" })
  );
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const login = async () => {
      const profile = await client.login({
        account: "delta",
        password: "password",
      });
      setToken(profile.profile.bearerToken);
    };
    login();
  }, [client]);

  // const { data } = useQuery({
  //   queryKey: ["login"],
  //   queryFn: async ({ signal }) => {
  //     return client.login(
  //       { account: "delta", password: "password" },
  //       { signal }
  //     );
  //   },
  // });

  return (
    <SharingContext.Provider value={{ client, credential: () => token }}>
      <main className={styles.root}>
        <DrawerInline
          open
          ref={sidebarRef}
          style={{ width: `${sidebarWidth}px` }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div
            className={mergeClasses(
              styles.drawerResizer,
              isResizing && styles.drawerResizing
            )}
            onMouseDown={startResizing}
          />

          <DrawerHeader className={styles.drawerHeader}>
            <DrawerHeaderTitle>Sharing Servers</DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody className={styles.drawerContent}>
            {Object.entries(servers).map(([id, server]) => (
              <DeltaServerCard
                key={id}
                id={id}
                name={server.name}
                description={server.description}
                url={server.url}
                selected={selected}
                onClick={setSelected}
              />
            ))}
            <AddServerCard />
          </DrawerBody>
        </DrawerInline>

        <SharingServerDetails />
      </main>
    </SharingContext.Provider>
  );
};

export default DeltaSharing;
