"use client";

import {
  makeStyles,
  shorthands,
  Text,
  Title1,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    ...shorthands.padding(tokens.spacingHorizontalXXL),
    ...shorthands.gap(tokens.spacingVerticalM),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});

export default function DeltaSharing(): JSX.Element {
  const styles = useStyles();

  return (
    <main className={styles.container}>
      <Title1 align="center">Hello Delta Sharing!</Title1>
      <Text>
        I am learning React and <strong>Fluent UI</strong>.
      </Text>
    </main>
  );
}
