"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

import { useSharingContext } from "@/clients";
import { DeltaServerCard } from "./DeltaServerCard";
import { AddServerCard } from "./AddServerCard";

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

export default function Page() {
  const styles = useStyles();
  const { servers } = useSharingContext();

  return (
    <div className={styles.root}>
      {Object.entries(servers)?.map(([id, server]) => (
        <DeltaServerCard key={id} id={id} info={server} />
      ))}
      <AddServerCard />
    </div>
  );
}
