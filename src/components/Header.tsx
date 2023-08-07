"use client";

import { FC } from "react";
import { makeStyles, tokens, Title3 } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    paddingLeft: tokens.spacingVerticalL,
    backgroundColor: tokens.colorBrandBackground,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralBackground6,
  },
  firaLabel: { fontFamily: "Fira Code, monospace" },
});

export const Header: FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.header}>
      <Title3 className={styles.firaLabel}>Lakehouse Studio</Title3>
    </div>
  );
};
