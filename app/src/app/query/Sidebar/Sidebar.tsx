"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  mergeClasses,
  Button,
} from "@fluentui/react-components";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerInline,
} from "@fluentui/react-components/unstable";
import { TableTree } from "./TableTree";

const useStyles = makeStyles({
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

export function Sidebar(): JSX.Element {
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

  return (
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
        <DrawerHeaderTitle>Catalogs</DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerContent}>
        <TableTree />
      </DrawerBody>
    </DrawerInline>
  );
}
