"use client";

import { useState, useEffect } from "react";
import {
  makeStyles,
  tokens,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  useRestoreFocusTarget,
  TreeItemLayout,
  FlatTree,
  Menu,
  MenuPopover,
  MenuItem,
  MenuTrigger,
  MenuList,
  FlatTreeItem,
} from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";
import { tableFromIPC, Table, Utf8, Binary } from "apache-arrow";

import { getTables } from "@/gen";

type FlatItem = HeadlessFlatTreeItemProps & { content: string };

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
  },
  tree: {
    height: "100%",
    width: "100%",
  },
});

type tablesSchema = {
  catalog_name: Utf8;
  db_schema_name: Utf8;
  table_name: Utf8;
  table_type: Utf8;
  table_schema: Binary;
};

const useTreeItems = (): FlatItem[] => {
  const [flatTree, setFlatTree] = useState<FlatItem[]>([]);
  const { data } = useSuspenseQuery(
    getTables.useQuery({ includeSchema: true })
  );

  useEffect(() => {
    const table = tableFromIPC<tablesSchema>(data.data);

    const catalogs: Record<string, FlatItem> = {};
    const schemas: Record<string, FlatItem> = {};
    const items: FlatItem[] = [];

    for (let i = -1, n = table.numRows; ++i < n; ) {
      const row = table.get(i);
      if (!row) {
        continue;
      }
      if (!(row.catalog_name in catalogs)) {
        catalogs[row.catalog_name] = {
          value: row.catalog_name,
          content: row.catalog_name,
        };
      }

      const schemaValue = `${row.catalog_name}.${row.db_schema_name}`;
      if (!(schemaValue in schemas)) {
        schemas[schemaValue] = {
          value: schemaValue,
          content: row.db_schema_name,
          parentValue: row.catalog_name,
        };
      }

      const tableValue = `${schemaValue}.${row.table_name}`;
      items.push({
        value: tableValue,
        content: row.table_name,
        parentValue: schemaValue,
      });

      const schema = tableFromIPC(row.table_schema).schema;
      for (const field of schema.fields) {
        items.push({
          value: `${tableValue}.${field.name}`,
          content: field.name,
          parentValue: tableValue,
        });
      }

      setFlatTree([
        ...Object.values(catalogs),
        ...Object.values(schemas),
        ...items,
      ]);
    }
  }, [data]);

  return flatTree;
};

export function TableTree(): JSX.Element {
  const classes = useStyles();
  const treeItems = useTreeItems();
  const flatTree = useHeadlessFlatTree_unstable(treeItems);
  const focusTargetAttribute = useRestoreFocusTarget();

  return (
    <div className={classes.root}>
      <FlatTree {...flatTree.getTreeProps()} aria-label="Flat Tree">
        {Array.from(flatTree.items(), (flatTreeItem) => {
          const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
          return (
            <Menu
              key={flatTreeItem.value}
              positioning="below-end"
              openOnContext
            >
              <MenuTrigger disableButtonEnhancement>
                <FlatTreeItem {...focusTargetAttribute} {...treeItemProps}>
                  <TreeItemLayout>{content}</TreeItemLayout>
                </FlatTreeItem>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>New</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          );
        })}
      </FlatTree>
    </div>
  );
}
