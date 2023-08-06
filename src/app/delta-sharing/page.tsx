"use client";

import { useState, type FC } from "react";
import {
  makeStyles,
  shorthands,
  Text,
  Title1,
  tokens,
} from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { DeltaSharingClient } from "@/clients";

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

const DeltaSharing: FC = () => {
  const styles = useStyles();
  const [client] = useState(
    new DeltaSharingClient({ baseUrl: "http://localhost:8080" })
  );
  const { data } = useQuery({
    queryKey: ["login"],
    queryFn: async ({ signal }) => {
      return client.login(
        { account: "delta", password: "password" },
        { signal }
      );
    },
  });

  return (
    <main className={styles.container}>
      <Title1 align="center">Hello Delta Sharing!</Title1>
      <Text>{data?.profile.expirationTime}</Text>
    </main>
  );
};

export default DeltaSharing;
