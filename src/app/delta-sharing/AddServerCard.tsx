"use client";

import { type FC, useCallback } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  CardPreview,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  cardBody: {
    height: "70px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.borderStyle("dashed"),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
    ...shorthands.borderColor(tokens.colorNeutralForeground3),
  },
  icon: { color: tokens.colorNeutralForeground3, fontSize: "62px" },
});

export const AddServerCard: FC = () => {
  const styles = useStyles();
  const onClick = useCallback(() => console.log("Interactive!"), []);

  return (
    <Card className={styles.cardBody} appearance="subtle" onClick={onClick}>
      <CardPreview>
        <AddRegular className={styles.icon} />
      </CardPreview>
    </Card>
  );
};
