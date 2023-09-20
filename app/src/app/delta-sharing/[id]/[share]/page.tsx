"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";

import { useSharingServerContext } from "@/clients";
import { SchemaCard } from "./SchemaCard";
import { AddSchemaCard } from "./AddSchemaCard";

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
  const { client, credential } = useSharingServerContext();

  const { data } = useSuspenseQuery({
    queryKey: ["schemas", params.id, params.share],
    queryFn: async ({ signal }) => {
      const data = await client.listSchemas(params.share, {
        token: credential(),
        signal,
      });
      // TODO pagination
      return data.items;
    },
  });

  return (
    <div className={styles.root}>
      {data.map((schema) => (
        <SchemaCard
          key={schema.name}
          schema={{ name: schema.name, share: params.share }}
        />
      ))}
      <AddSchemaCard serverId={params.id} shareName={params.share} />
    </div>
  );
}
