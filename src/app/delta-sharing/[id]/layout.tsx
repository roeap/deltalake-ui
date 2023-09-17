"use client";

import { useState, useEffect } from "react";

import { SharingServerContext } from "@/components";
import { DeltaSharingClient } from "@/clients";

export default function SharingServerLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [client] = useState(
    new DeltaSharingClient({ baseUrl: "http://localhost:8080" })
  );
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const login = async () => {
      const profile = await client.login({
        account: "delta",
        password: "password",
      });
      setToken(profile.profile.bearerToken);
    };
    login();
  }, [client]);

  return (
    <SharingServerContext.Provider value={{ client, credential: () => token }}>
      {token && children}
    </SharingServerContext.Provider>
  );
}