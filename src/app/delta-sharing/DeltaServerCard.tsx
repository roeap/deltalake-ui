"use client";

import { type FC, useCallback } from "react";
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
  name: string;
  description: string;
  url: string;
  selected?: string;
  onClick: (name: string) => void;
};

export const DeltaServerCard: FC<SharingServerProps> = ({
  id,
  name,
  description,
  selected,
  onClick,
}) => {
  const classes = useStyles();
  const onClickInternal: CardProps["onSelectionChange"] = useCallback(
    () => onClick(id),
    [id, onClick]
  );

  return (
    <Card
      className={classes.cardBody}
      appearance="filled"
      selected={selected === id}
      orientation="horizontal"
      onSelectionChange={onClickInternal}
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
