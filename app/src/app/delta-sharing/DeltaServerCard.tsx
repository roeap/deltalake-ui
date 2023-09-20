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
import { SharingServerInfo } from "@/gen";

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
  server: SharingServerInfo;
};

export const DeltaServerCard: FC<SharingServerProps> = ({ server }) => {
  const classes = useStyles();
  const pathname = usePathname();

  const href = `${pathname}/${server.id}`;

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
          header={<Text weight="semibold">{server.name}</Text>}
          description={
            <Caption1 className={classes.caption}>
              {server.description}
            </Caption1>
          }
        />
      </Card>
    </Link>
  );
};
