"use client";

import { makeStyles, tokens } from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";
import { tableFromIPC, Table, Utf8, Binary } from "apache-arrow";

import { getTables } from "@/gen";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

type tablesSchema = {
  catalog_name: Utf8;
  db_schema_name: Utf8;
  table_name: Utf8;
  table_type: Utf8;
  table_schema: Binary;
};

const useCatalogs = (): Table<tablesSchema> => {
  const { data } = useSuspenseQuery(
    getTables.useQuery({ includeSchema: true })
  );
  const table = tableFromIPC(data.data);
  return table;
};

export function TableTree(): JSX.Element {
  const classes = useStyles();
  const table = useCatalogs();

  const row = table.get(1);
  const schema = tableFromIPC(row?.table_schema);

  console.log({ schema });

  return <main className={classes.root}>Hello World</main>;
}
