"use client";

import { useMemo } from "react";
import { TreeItemLayout } from "@fluentui/react-components";
import {
  ServerRegular,
  TableSimpleMultipleRegular,
  TableSimpleRegular,
  TextFieldRegular,
  NumberSymbolRegular,
  BracesRegular,
  ListRegular,
  CalendarMonthRegular,
  ClockRegular,
} from "@fluentui/react-icons";
import { Type } from "apache-arrow";

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

export function CatalogTreeItemLayout({
  item,
}: {
  item: ItemInfo;
}): JSX.Element {
  let { icon, label } = useMemo(() => {
    switch (item.kind) {
      case "catalog":
        return { icon: <ServerRegular />, label: item.name };
      case "schema":
        return { icon: <TableSimpleMultipleRegular />, label: item.name };
      case "table":
        return { icon: <TableSimpleRegular />, label: item.name };
      case "field":
        const label = `${item.name} [${item.dataType.toString()}]`;
        if (item.dataType === Type.Utf8) {
          return { icon: <TextFieldRegular />, label };
        } else if ([Type.Map, Type.Struct].includes(item.dataType)) {
          return { icon: <BracesRegular />, label };
        } else if ([Type.List, Type.FixedSizeList].includes(item.dataType)) {
          return { icon: <ListRegular />, label };
        } else if (
          [Type.Date, Type.DateDay, Type.DateMillisecond].includes(
            item.dataType
          )
        ) {
          return { icon: <CalendarMonthRegular />, label };
        } else if (
          [
            Type.Timestamp,
            Type.TimestampSecond,
            Type.TimestampMillisecond,
            Type.TimestampMicrosecond,
            Type.TimestampNanosecond,
            Type.TimeSecond,
            Type.TimeMillisecond,
            Type.TimeMicrosecond,
            Type.TimeNanosecond,
          ].includes(item.dataType)
        ) {
          return { icon: <ClockRegular />, label };
        } else {
          return { icon: <NumberSymbolRegular />, label };
        }
    }
  }, [item]);

  return <TreeItemLayout iconBefore={icon}>{label}</TreeItemLayout>;
}
