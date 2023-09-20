"use client";

import { type FC, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  makeStyles,
  CardHeader,
  tokens,
  Card,
  CardPreview,
  Text,
  Caption1,
  CardProps,
} from "@fluentui/react-components";

import { DeltaSharingIcon } from "@/icons";
import { SharingServerInfo } from "@/clients";

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
  id: string;
  info: SharingServerInfo;
};

export const DeltaServerCard: FC<SharingServerProps> = ({ id, info }) => {
  const classes = useStyles();
  const pathname = usePathname();

  const href = `${pathname}/${id}`;

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
        <CardHeader
          header={<Text weight="semibold">{info.name}</Text>}
          description={
            <Caption1 className={classes.caption}>{info.description}</Caption1>
          }
        />
      </Card>
    </Link>
  );
};
