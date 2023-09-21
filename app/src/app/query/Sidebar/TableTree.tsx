"use client";

import { useState, useEffect } from "react";
import {
  makeStyles,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  useRestoreFocusTarget,
  FlatTree,
  Menu,
  MenuPopover,
  MenuItem,
  MenuTrigger,
  MenuList,
  FlatTreeItem,
} from "@fluentui/react-components";
import { useSuspenseQuery } from "@suspensive/react-query";
import {
  tableFromIPC,
  Utf8,
  Binary,
  Type,
  Field,
  Struct,
  Map_,
  List,
} from "apache-arrow";
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
  dataType: Type;
};

type ItemInfo = CatalogInfo | SchemaInfo | TableInfo | FieldInfo;

type FlatItem = HeadlessFlatTreeItemProps & {
  item: ItemInfo;
};

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

function isStructField(item: Field): item is Field<Struct> {
  return item.typeId === Type.Struct;
}

function isMapField(item: Field): item is Field<Map_> {
  return item.typeId === Type.Map;
}

function isListField(item: Field): item is Field<List> {
  return item.typeId === Type.List;
}

function getFieldItems(field: Field, rootValue: string): FlatItem[] {
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

      const schema = tableFromIPC(row.table_schema).schema;
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
  const flatTree = useHeadlessFlatTree_unstable(treeItems);
  const focusTargetAttribute = useRestoreFocusTarget();

  return (
    <div className={classes.root}>
      <FlatTree {...flatTree.getTreeProps()} aria-label="Flat Tree">
        {Array.from(flatTree.items(), (flatTreeItem) => {
          const { item, ...treeItemProps } = flatTreeItem.getTreeItemProps();
          return (
            <Menu
              key={flatTreeItem.value}
              positioning="below-end"
              openOnContext
            >
              <MenuTrigger disableButtonEnhancement>
                <FlatTreeItem {...focusTargetAttribute} {...treeItemProps}>
                  <CatalogTreeItemLayout item={item} />
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
