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

import { Schema } from "@/clients";
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

type SharingServerProps = {
  schema: Schema;
};

export const SchemaCard: FC<SharingServerProps> = ({ schema }) => {
  const classes = useStyles();
  const pathname = usePathname();

  const href = `${pathname}/${schema.name}`;

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
        <CardHeader header={<Text weight="semibold">{schema.name}</Text>} />
      </Card>
    </Link>
  );
};
