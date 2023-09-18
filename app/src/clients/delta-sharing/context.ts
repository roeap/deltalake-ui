"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { DeltaSharingClient } from "./client";

interface SharingServerInfo {
  name: string;
  description: string;
  url: string;
}

interface SharingContextProps {
  servers: Record<string, SharingServerInfo>;
}

export const SharingContext = createContext<SharingContextProps>({
  servers: {},
});

export const useSharingContext = () => useContext(SharingContext);

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
  const { servers } = useSharingContext();
  const pathname = usePathname();
  const segments = pathname.split("/");
  if (segments.length < 3) {
    throw new Error("useSharingServer used outside sharing serv er routes.");
  }
  const id = segments[2];
  const info = servers[id];
  const client = new DeltaSharingClient({ baseUrl: info.url });
  return { id, info, client };
};
