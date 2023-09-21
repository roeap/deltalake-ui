"use client";

import { makeStyles, tokens } from "@fluentui/react-components";

import { Sidebar } from "./Sidebar";
import Editor from "./Editor";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

export default function QueryPage(): JSX.Element {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Sidebar />
      <Editor />
    </main>
  );
}
