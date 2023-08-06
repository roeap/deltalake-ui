"use client";

import { useState, type FC } from "react";
import {
  makeStyles,
  shorthands,
  Text,
  Title1,
  tokens,
} from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";

import { DeltaSharingClient } from "@/clients";
import { ResizeContent, ResizeHandleRight, ResizePanel } from "@/components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  resizeHandle: {
    cursor: "col-resize",
    width: "3px",
    height: "100%",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: tokens.colorNeutralBackground1Hover,
    boxSizing: "border-box",
    ":hover": {
      backgroundColor: tokens.colorBrandForeground1,
    },
  },
});

const DeltaSharing: FC = () => {
  const classes = useStyles();
  const [client] = useState(
    new DeltaSharingClient({ baseUrl: "http://localhost:8080" })
  );
  const { data } = useQuery({
    queryKey: ["login"],
    queryFn: async ({ signal }) => {
      return client.login(
        { account: "delta", password: "password" },
        { signal }
      );
    },
  });

  return (
    <main className={classes.container}>
      <ResizePanel initialWidth={300} minWidth={200}>
        <ResizeContent>
          <div></div>
        </ResizeContent>
        <ResizeHandleRight>
          <div className={classes.resizeHandle} />
        </ResizeHandleRight>
      </ResizePanel>
      <div className={classes.main}></div>
    </main>
  );
};

export default DeltaSharing;
