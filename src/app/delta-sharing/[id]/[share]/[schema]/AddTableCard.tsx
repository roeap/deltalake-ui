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

type AddTableDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  serverId: string;
  shareName: string;
  schemaName: string;
} & Omit<DialogProps, "children">;

const AddTableDialog: FC<AddTableDialogProps> = ({
  setOpen,
  serverId,
  shareName,
  schemaName,
  ...otherProps
}) => {
  const classes = useStyles();
  const { client, credential } = useSharingServerContext();
  const [tableName, setTableName] = useState("");
  const [tableLocation, setTableLocation] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      name,
      location,
    }: {
      name: string;
      location: string;
    }) => {
      const data = await client.createTable(
        shareName,
        schemaName,
        { name, location },
        { token: credential() }
      );
      return data.table;
      // TODO add toaster to show success
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables", serverId, shareName, schemaName],
      });
      setOpen(false);
      setTableName("");
      setTableLocation("");
    },
  });

  return (
    <Dialog {...otherProps}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Add Table</DialogTitle>
          <DialogContent className={classes.dialogBody}>
            <Field label="Name" orientation="horizontal">
              <Input
                value={tableName}
                onChange={(_, data) => setTableName(data.value)}
              />
            </Field>
            <Field label="Location" orientation="horizontal">
              <Input
                value={tableLocation}
                onChange={(_, data) => setTableLocation(data.value)}
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <Button
              appearance="primary"
              onClick={() =>
                mutation.mutate({ name: tableName, location: tableLocation })
              }
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
  schemaName: string;
};

export const AddTableCard: FC<AddSchemaCardProps> = ({
  serverId,
  shareName,
  schemaName,
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
      <AddTableDialog
        open={open}
        setOpen={setOpen}
        onOpenChange={(_event, data) => {
          setOpen(data.open);
        }}
        serverId={serverId}
        shareName={shareName}
        schemaName={schemaName}
      />
    </>
  );
};
