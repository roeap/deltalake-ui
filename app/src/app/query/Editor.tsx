"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  mergeClasses,
  Button,
  Textarea,
} from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";
import { tableFromIPC, Table, Utf8, Binary } from "apache-arrow";
import MonacoEditor from "@monaco-editor/react";

import { getTables } from "@/gen";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  content: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
  area: {
    width: "100%",
    height: "300px",
  },
});

const useCatalogs = (): Table<{
  catalog_name: Utf8;
  db_schema_name: Utf8;
  table_name: Utf8;
  table_type: Utf8;
  table_schema: Binary;
}> => {
  const { data } = useSuspenseQuery(
    getTables.useQuery({ includeSchema: true })
  );
  const table = tableFromIPC(data.data);
  return table;
};

export default function Editor(): JSX.Element {
  const classes = useStyles();
  const table = useCatalogs();

  const row = table.get(1);
  const schema = tableFromIPC(row?.table_schema);

  console.log({ schema });

  return (
    <div className={classes.content}>
      <MonacoEditor
        className={classes.area}
        defaultValue="SELECT * from my_table"
        language="sql"
      />
    </div>
  );
}
