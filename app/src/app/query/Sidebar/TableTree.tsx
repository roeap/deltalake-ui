"use client";

import { useState, useEffect } from "react";
import * as fc from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";
import * as arrow from "apache-arrow";
import { CatalogTreeItemLayout } from "./CatalogTreeItemLayout";

import { getTables } from "@/gen";

type CatalogInfo = {
  kind: "catalog";
  name: string;
};

type SchemaInfo = {
  kind: "schema";
  name: string;
};

type TableInfo = {
  kind: "table";
  name: string;
};

type FieldInfo = {
  kind: "field";
  name: string;
  dataType: arrow.Type;
};

type ItemInfo = CatalogInfo | SchemaInfo | TableInfo | FieldInfo;

type FlatItem = fc.HeadlessFlatTreeItemProps & {
  item: ItemInfo;
};

const useStyles = fc.makeStyles({
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
  catalog_name: arrow.Utf8;
  db_schema_name: arrow.Utf8;
  table_name: arrow.Utf8;
  table_type: arrow.Utf8;
  table_schema: arrow.Binary;
};

function isStructField(item: arrow.Field): item is arrow.Field<arrow.Struct> {
  return item.typeId === arrow.Type.Struct;
}

function isMapField(item: arrow.Field): item is arrow.Field<arrow.Map_> {
  return item.typeId === arrow.Type.Map;
}

function isListField(item: arrow.Field): item is arrow.Field<arrow.List> {
  return item.typeId === arrow.Type.List;
}

function getFieldItems(field: arrow.Field, rootValue: string): FlatItem[] {
  const items: FlatItem[] = [];
  const root = `${rootValue}.${field.name}`;
  items.push({
    value: root,
    item: { kind: "field", name: field.name, dataType: field.typeId },
    parentValue: rootValue,
  });
  if (isStructField(field)) {
    for (const child of field.type.children) {
      const children = getFieldItems(child, root);
      items.push(...children);
    }
  } else if (isMapField(field)) {
    // TODO do we want to see the "entries" field?
    for (const child of field.type.children[0].type.children) {
      const children = getFieldItems(child, root);
      items.push(...children);
    }
  } else if (isListField(field)) {
    items.push(...getFieldItems(field.type.valueField, root));
  }
  return items;
}

const useTreeItems = (): FlatItem[] => {
  const [flatTree, setFlatTree] = useState<FlatItem[]>([]);
  const { data } = useSuspenseQuery(
    getTables.useQuery({ includeSchema: true })
  );

  useEffect(() => {
    const table = arrow.tableFromIPC<tablesSchema>(data.data);

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
          item: { kind: "catalog", name: row.catalog_name },
        };
      }

      const schemaValue = `${row.catalog_name}.${row.db_schema_name}`;
      if (!(schemaValue in schemas)) {
        schemas[schemaValue] = {
          value: schemaValue,
          item: { kind: "schema", name: row.db_schema_name },
          parentValue: row.catalog_name,
        };
      }

      const tableValue = `${schemaValue}.${row.table_name}`;
      items.push({
        value: tableValue,
        item: { kind: "table", name: row.table_name },
        parentValue: schemaValue,
      });

      const schema = arrow.tableFromIPC(row.table_schema).schema;
      for (const field of schema.fields) {
        items.push(...getFieldItems(field, tableValue));
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
  const flatTree = fc.useHeadlessFlatTree_unstable(treeItems);
  const focusTargetAttribute = fc.useRestoreFocusTarget();

  return (
    <div className={classes.root}>
      <fc.FlatTree {...flatTree.getTreeProps()} aria-label="Flat Tree">
        {Array.from(flatTree.items(), (flatTreeItem) => {
          const { item, ...treeItemProps } = flatTreeItem.getTreeItemProps();
          return (
            <fc.Menu
              key={flatTreeItem.value}
              positioning="below-end"
              openOnContext
            >
              <fc.MenuTrigger disableButtonEnhancement>
                <fc.FlatTreeItem {...focusTargetAttribute} {...treeItemProps}>
                  <CatalogTreeItemLayout item={item} />
                </fc.FlatTreeItem>
              </fc.MenuTrigger>
              <fc.MenuPopover>
                <fc.MenuList>
                  <fc.MenuItem>Edit</fc.MenuItem>
                  <fc.MenuItem>New</fc.MenuItem>
                </fc.MenuList>
              </fc.MenuPopover>
            </fc.Menu>
          );
        })}
      </fc.FlatTree>
    </div>
  );
}
