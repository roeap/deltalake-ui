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
  shareName: string;
} & Omit<DialogProps, "children">;

const AddSchemaDialog: FC<AddShareDialogProps> = ({
  setOpen,
  serverId,
  shareName,
  ...otherProps
}) => {
  const classes = useStyles();
  const { client, credential } = useSharingServerContext();
  const [schemaName, setSchemaName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (name: string) => {
      const data = await client.createSchema(
        shareName,
        { name },
        { token: credential() }
      );
      return data.schema;
      // TODO add toaster to show success
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["schemas", serverId, shareName],
      });
      setOpen(false);
      setSchemaName("");
    },
  });

  return (
    <Dialog {...otherProps}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Add Schema</DialogTitle>
          <DialogContent className={classes.dialogBody}>
            <Field label="Name" orientation="horizontal">
              <Input
                value={schemaName}
                onChange={(_, data) => setSchemaName(data.value)}
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={() => mutation.mutate(schemaName)}
            >
              Create
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

type AddSchemaCardProps = {
  serverId: string;
  shareName: string;
};

export const AddSchemaCard: FC<AddSchemaCardProps> = ({
  serverId,
  shareName,
}) => {
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
      <AddSchemaDialog
        open={open}
        setOpen={setOpen}
        onOpenChange={(_event, data) => {
          setOpen(data.open);
        }}
        serverId={serverId}
        shareName={shareName}
      />
    </>
  );
};
