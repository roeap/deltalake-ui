"use client";

import { FC } from "react";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

import { DeltaSharingClient } from "@/clients";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    ...shorthands.flex(1),
    backgroundColor: tokens.colorNeutralBackground4,
  },
});

export const SharingServerDetails: FC = () => {
  const styles = useStyles();
  return <div className={styles.root}></div>;
};
