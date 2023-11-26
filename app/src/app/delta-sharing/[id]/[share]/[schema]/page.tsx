"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useSharingServerContext } from "@/clients";
import { TableCard } from "./TableCard";
import { AddTableCard } from "./AddTableCard";

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
  params: { id: string; share: string; schema: string };
}) {
  const styles = useStyles();
  const { client, credential } = useSharingServerContext();

  const { data } = useSuspenseQuery({
    queryKey: ["tables", params.id, params.share, params.schema],
    queryFn: async ({ signal }) => {
      const data = await client.listTables(params.share, params.schema, {
        token: credential(),
        signal,
      });
      // TODO pagination
      return data.items;
    },
  });

  return (
    <div className={styles.root}>
      {data.map((table) => (
        <TableCard
          key={table.name}
          table={{
            name: table.name,
            share: params.share,
            schema: params.schema,
          }}
        />
      ))}
      <AddTableCard
        serverId={params.id}
        shareName={params.share}
        schemaName={params.schema}
      />
    </div>
  );
}
