"use client";

import { type FC, useState, Dispatch, SetStateAction } from "react";
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

import { useSharingServerContext } from "@/clients";

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

type AddShareDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  serverId: string;
} & Omit<DialogProps, "children">;

const AddShareDialog: FC<AddShareDialogProps> = ({
  setOpen,
  serverId,
  ...otherProps
}) => {
  const classes = useStyles();
  const { client, credential } = useSharingServerContext();
  const [shareName, setShareName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const data = await client.createShare({ name }, { token: credential() });
      // TODO add toaster to show success
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shares", serverId] });
      setOpen(false);
      setShareName("");
    },
  });

  return (
    <Dialog {...otherProps}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Add Share</DialogTitle>
          <DialogContent className={classes.dialogBody}>
            <Field label="Name" orientation="horizontal">
              <Input
                value={shareName}
                onChange={(_, data) => setShareName(data.value)}
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={() => mutation.mutate(shareName)}
            >
              Create
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

type AddShareCardProps = {
  serverId: string;
};

export const AddShareCard: FC<AddShareCardProps> = ({ serverId }) => {
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
        setOpen={setOpen}
        onOpenChange={(_event, data) => {
          setOpen(data.open);
        }}
        serverId={serverId}
      />
    </>
  );
};
