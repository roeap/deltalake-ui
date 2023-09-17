"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@tanstack/react-query";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    ...shorthands.flex(1),
    backgroundColor: tokens.colorNeutralBackground4,
    ...shorthands.padding(tokens.spacingVerticalM),
  },
});

export default function Page({
  params,
}: {
  params: { id: string; share: string };
}) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {`server: ${params.id}, share: ${params.share}`}
    </div>
  );
}
