"use client";

import { type FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  makeStyles,
  CardHeader,
  tokens,
  Card,
  CardPreview,
  Text,
} from "@fluentui/react-components";

import { Table } from "@/clients";
import { DeltaSharingIcon } from "@/icons";

const useStyles = makeStyles({
  cardBody: { height: "fit-content", width: "100%" },
  horizontalCardImage: {
    width: "76px",
    height: "69px",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: "5px",
  },
  caption: {
    color: tokens.colorNeutralForeground3,
  },
});

type TableCardProps = {
  table: Table;
};

export const TableCard: FC<TableCardProps> = ({ table }) => {
  const classes = useStyles();
  const pathname = usePathname();

  const href = `${pathname}/${table.name}`;

  return (
    <Link href={href}>
      <Card
        className={classes.cardBody}
        appearance="filled"
        orientation="horizontal"
      >
        <CardPreview className={classes.horizontalCardImage}>
          <DeltaSharingIcon />
        </CardPreview>
        <CardHeader header={<Text weight="semibold">{table.name}</Text>} />
      </Card>
    </Link>
  );
};
