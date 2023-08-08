"use client";

import { makeStyles, shorthands, Label } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    ...shorthands.padding("25px"),
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    alignItems: "start",
    justifyContent: "start",
    minHeight: 0,
    minWidth: 0,
    flexGrow: 1,
  },
});

export default function Home(): JSX.Element {
  const classes = useStyles();
  return <main className={classes.container}></main>;
}
