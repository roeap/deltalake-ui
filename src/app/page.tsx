"use client";

import { makeStyles, shorthands } from "@fluentui/react-components";

import { AppearanceCard } from "@/components";

const useStyles = makeStyles({
  container: {
    ...shorthands.padding("25px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "start",
    minHeight: 0,
    minWidth: 0,
    flexGrow: 1,
  },
});

export default function Home(): JSX.Element {
  const styles = useStyles();

  return (
    <main className={styles.container}>
      <AppearanceCard />
    </main>
  );
}
