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
  Caption1,
  CardProps,
} from "@fluentui/react-components";

import { Share } from "@/clients";
import { DeltaSharingIcon } from "@/icons";
import { useServerInfo } from "@/components";

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
  share: Share;
};

export const ShareCard: FC<SharingServerProps> = ({ share }) => {
  const classes = useStyles();
  const { id } = useServerInfo();
  const pathname = usePathname();

  const href = `/delta-sharing/${id}/${share.name}`;

  return (
    <Link href={href}>
      <Card
        className={classes.cardBody}
        appearance="filled"
        selected={pathname === href}
        orientation="horizontal"
      >
        <CardPreview className={classes.horizontalCardImage}>
          <DeltaSharingIcon />
        </CardPreview>
        <CardHeader
          header={<Text weight="semibold">{share.name}</Text>}
          // description={
          //   <Caption1 className={classes.caption}>
          //     {`${share.schema.length} schemas`}
          //   </Caption1>
          // }
        />
      </Card>
    </Link>
  );
};
