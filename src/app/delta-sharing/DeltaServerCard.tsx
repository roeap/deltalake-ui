"use client";

import { type FC, useCallback } from "react";
import {
  makeStyles,
  CardHeader,
  tokens,
  Card,
  CardPreview,
  mergeClasses,
  Text,
  Caption1,
} from "@fluentui/react-components";

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
  name: string;
  description: string;
  url: string;
};

export const DeltaServerCard: FC<SharingServerProps> = ({
  name,
  description,
}) => {
  const classes = useStyles();
  const onClick = useCallback(() => console.log("Interactive!"), []);

  return (
    <Card
      className={mergeClasses(classes.cardBody)}
      appearance="filled"
      onClick={onClick}
      selected={true}
      orientation="horizontal"
    >
      <CardPreview className={classes.horizontalCardImage}>
        <DeltaSharingIcon />
      </CardPreview>
      <CardHeader
        header={<Text weight="semibold">{name}</Text>}
        description={
          <Caption1 className={classes.caption}>{description}</Caption1>
        }
      />
    </Card>
  );
};
