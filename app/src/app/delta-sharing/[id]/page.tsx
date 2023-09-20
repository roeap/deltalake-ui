"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";

import { useSharingServerContext } from "@/clients";
import { ShareCard } from "./ShareCard";
import { AddShareCard } from "./AddShareCard";

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

export default function Page({ params }: { params: { id: string } }) {
  const styles = useStyles();
  const { client, credential } = useSharingServerContext();

  const { data } = useSuspenseQuery({
    queryKey: ["shares", params.id],
    queryFn: async ({ signal }) => {
      const data = await client.listShares({}, { token: credential(), signal });
      // TODO pagination
      return data.items;
    },
  });

  return (
    <div className={styles.root}>
      {data.map((share) => (
        <ShareCard key={share.name} share={share} />
      ))}
      <AddShareCard serverId={params.id} />
    </div>
  );
}
