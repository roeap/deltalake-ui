"use client";

import { createContext, useContext } from "react";
import { DeltaSharingClient } from "@/clients";
import { usePathname } from "next/navigation";

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

export const useServerInfo = (id: string) => {
  const { servers } = useSharingContext();
  return { server: servers[id] };
};
