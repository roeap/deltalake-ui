import { type FC, useCallback } from "react";
import {
  makeStyles,
  Card,
  CardPreview,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  footer: { justifyContent: "flex-end" },
  iconConnected: { color: tokens.colorPaletteLightGreenForeground3 },
  preview: {
    height: "100px",
    width: "100px",
    ...shorthands.borderStyle("dashed"),
    ...shorthands.borderWidth(tokens.strokeWidthThick),
    ...shorthands.borderColor(tokens.colorNeutralForeground3),
  },
});

export const AddServiceCard: FC = () => {
  const classes = useStyles();
  const onClick = useCallback(() => console.log("Interactive!"), []);

  return (
    <Card appearance="subtle" onClick={onClick}>
      <CardPreview className={classes.preview}>
        <AddRegular style={{ color: tokens.colorNeutralForeground3 }} />
      </CardPreview>
    </Card>
  );
};
