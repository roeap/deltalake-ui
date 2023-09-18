import { FC } from "react";
import { Spinner, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export type LoadingProps = {
  /**
   * The size of the spinner.
   */
  spinnerSize?:
    | "small"
    | "tiny"
    | "extra-small"
    | "medium"
    | "large"
    | "extra-large"
    | "huge";
};

export const Loading: FC<LoadingProps> = ({ spinnerSize = "medium" }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Spinner size={spinnerSize} />
    </div>
  );
};

export default Loading;
