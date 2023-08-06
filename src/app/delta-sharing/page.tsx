"use client";

import { useState, type FC, useCallback } from "react";
import {
  makeStyles,
  shorthands,
  CardHeader,
  tokens,
  Card,
  CardPreview,
  mergeClasses,
  Text,
  Caption1,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";

import { DeltaSharingClient } from "@/clients";
import { DeltaSharingIcon } from "@/icons";
import { ResizeContent, ResizeHandleRight, ResizePanel } from "@/components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  resizeHandle: {
    cursor: "col-resize",
    width: "3px",
    height: "100%",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: tokens.colorNeutralForeground4,
    boxSizing: "border-box",
    ":hover": {
      backgroundColor: tokens.colorBrandForeground1,
    },
  },
  cardHeader: {
    height: "25px",
    width: "100%",
    borderBottomStyle: "solid",
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomColor: tokens.colorNeutralForeground3,
  },
  cardBody: { height: "fit-content", width: "100%" },
  cardBodyEmpty: {
    height: "70px",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.borderStyle("dashed"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    ...shorthands.borderColor(tokens.colorNeutralForeground3),
  },
  resizeContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
    ...shorthands.padding(tokens.spacingVerticalL),
  },
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

export const ServiceCard: FC<SharingServerProps> = ({ name, description }) => {
  const classes = useStyles();
  const onClick = useCallback(() => console.log("Interactive!"), []);

  return (
    <Card
      className={mergeClasses(classes.cardBody)}
      appearance="filled-alternative"
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

export const AddServiceCard: FC = () => {
  const classes = useStyles();
  const onClick = useCallback(() => console.log("Interactive!"), []);

  return (
    <Card
      className={mergeClasses(classes.cardBody, classes.cardBodyEmpty)}
      appearance="subtle"
      onClick={onClick}
    >
      <CardPreview>
        <AddRegular
          style={{ color: tokens.colorNeutralForeground3, fontSize: "62px" }}
        />
      </CardPreview>
    </Card>
  );
};

const DeltaSharing: FC = () => {
  const classes = useStyles();
  const [client] = useState(
    new DeltaSharingClient({ baseUrl: "http://localhost:8080" })
  );
  const { data } = useQuery({
    queryKey: ["login"],
    queryFn: async ({ signal }) => {
      return client.login(
        { account: "delta", password: "password" },
        { signal }
      );
    },
  });

  return (
    <main className={classes.container}>
      <ResizePanel initialWidth={300} minWidth={200}>
        <ResizeContent className={classes.resizeContent}>
          <ServiceCard
            name="Sharing Server"
            description="Awesome data to share"
            url="http://localhost:8080"
          />
          <AddServiceCard />
        </ResizeContent>
        <ResizeHandleRight>
          <div className={classes.resizeHandle} />
        </ResizeHandleRight>
      </ResizePanel>
      <div className={classes.main}></div>
    </main>
  );
};

export default DeltaSharing;
