"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { useTransport, useSuspenseQuery } from "@connectrpc/connect-query";

import { getSharingServer } from "@/gen";
import { DeltaSharingClient } from "./client";

export interface SharingServerInfo {
  name: string;
  description: string;
  url: string;
}

interface SharingServerContextProps {
  client: DeltaSharingClient;
  credential: () => string;
}

export const SharingServerContext = createContext<SharingServerContextProps>({
  client: new DeltaSharingClient({ baseUrl: "http://" }),
  credential: () => "",
});

export const useSharingServerContext = () => useContext(SharingServerContext);

export const useSharingServer = () => {
  const pathname = usePathname();
  const transport = useTransport();
  const segments = (pathname || "").split("/");
  const id = segments.length >= 3 ? segments[2] : "";
  const { data } = useSuspenseQuery(getSharingServer, { id });

  if (!data.server) {
    throw new Error("Failed to fetch sharing server details");
  }

  const client = new DeltaSharingClient({ baseUrl: data.server.url });
  return { id, info: data.server, client };
};
