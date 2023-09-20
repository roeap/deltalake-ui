"use client";

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { SharingContext } from "@/clients";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground3,
  },
});

const servers = {
  "1": {
    name: "Production data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
  "2": {
    name: "Business data",
    description: "Awesome data to share",
    url: "http://localhost:8080",
  },
};

export default function SharingLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const styles = useStyles();

  return (
    <SharingContext.Provider value={{ servers }}>
      <main className={styles.root}>{children}</main>
    </SharingContext.Provider>
  );
}
