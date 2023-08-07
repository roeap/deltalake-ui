"use client";

import { createContext, useContext } from "react";
import { DeltaSharingClient } from "@/clients";

interface SharingContextProps {
  client?: DeltaSharingClient;
  credential?: () => string;
}

export const SharingContext = createContext<SharingContextProps>({});

export const useSharingContext = () => useContext(SharingContext);
