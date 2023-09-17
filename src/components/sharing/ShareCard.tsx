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

import { Share } from "@/clients";
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
  share: Share;
};

export const ShareCard: FC<SharingServerProps> = ({ share }) => {
  const classes = useStyles();
  const pathname = usePathname();

  const href = `${window.location}/${share.name}`;

  return (
    <Link href={href}>
      <Card
        className={classes.cardBody}
        appearance="filled"
        selected={pathname.endsWith(share.name)}
        orientation="horizontal"
      >
        <CardPreview className={classes.horizontalCardImage}>
          <DeltaSharingIcon />
        </CardPreview>
        <CardHeader header={<Text weight="semibold">{share.name}</Text>} />
      </Card>
    </Link>
  );
};
