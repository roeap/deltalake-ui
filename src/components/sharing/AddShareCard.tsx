"use client";

import { type FC, useState } from "react";
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  CardPreview,
  useRestoreFocusTarget,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Field,
  Input,
  DialogProps,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSharingServerContext, useServerInfo } from "./context";

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
  dialogBody: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
  },
});

const AddShareDialog: FC<Omit<DialogProps, "children">> = (props) => {
  const styles = useStyles();
  const { id } = useServerInfo();
  const { client, credential } = useSharingServerContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("creating");
      const data = await client.createShare(
        { id: "shareid", name: "sharename" },
        { token: credential() }
      );
      console.log({ data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shares", id] });
    },
  });

  return (
    <Dialog {...props}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Add Share</DialogTitle>
          <DialogContent className={styles.dialogBody}>
            <Field label="ID" orientation="horizontal">
              <Input />
            </Field>
            <Field label="Name" orientation="horizontal">
              <Input />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button appearance="primary" onClick={() => mutation.mutate()}>
              Create
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const AddShareCard: FC = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  return (
    <>
      <Card
        className={styles.cardBody}
        appearance="subtle"
        {...restoreFocusTargetAttribute}
        onClick={() => {
          setOpen(true);
        }}
      >
        <CardPreview>
          <AddRegular className={styles.icon} />
        </CardPreview>
      </Card>
      <AddShareDialog
        open={open}
        onOpenChange={(_event, data) => {
          setOpen(data.open);
        }}
      />
    </>
  );
};
