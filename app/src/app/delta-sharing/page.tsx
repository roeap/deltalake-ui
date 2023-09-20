"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";

import { listSharingServers } from "@/gen";
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
  const { data } = useSuspenseQuery(listSharingServers.useQuery({}));

  return (
    <div className={styles.root}>
      {data.servers.map((server) => (
        <DeltaServerCard key={server.id} server={server} />
      ))}
      <AddServerCard />
    </div>
  );
}
