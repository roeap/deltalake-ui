"use client";

import { type FC } from "react";
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
  rowContainer: {
    ...shorthands.padding("10px"),
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 0,
    minWidth: 0,
    columnGap: "25px",
  },
});

const RowContainer: FC<{ children: React.ReactNode; label: string }> = ({
  label,
  children,
}) => {
  const classes = useStyles();
  return (
    <>
      <Label size="large">{label}</Label>
      <div className={classes.rowContainer}>{children}</div>
    </>
  );
};

export default function Home(): JSX.Element {
  const classes = useStyles();

  return <main className={classes.container}></main>;
}
