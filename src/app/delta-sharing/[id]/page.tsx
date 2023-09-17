"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";

import { useSharingServerContext } from "../../../components/sharing/context";
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
  const { id } = params;
  const styles = useStyles();
  const { client, credential } = useSharingServerContext();

  const { data } = useQuery({
    queryKey: ["shares", id],
    queryFn: async () => {
      const data = await client.listShares({}, { token: credential() });
      // TODO pagination
      return data.items;
    },
  });

  return (
    <div className={styles.root}>
      {data?.map((share) => (
        <ShareCard key={share.id} share={share} />
      ))}
      <AddShareCard serverId={id} />
    </div>
  );
}
