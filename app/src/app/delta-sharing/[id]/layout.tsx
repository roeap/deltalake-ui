"use client";

import { useSuspenseQuery } from "@suspensive/react-query";
import { SharingServerContext, useSharingServer } from "@/clients";

export default function SharingServerLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { id, client } = useSharingServer();

  const { data: token } = useSuspenseQuery({
    queryKey: ["sharing-server-token", id],
    queryFn: async () => {
      const profile = await client.login({
        account: "delta",
        password: "password",
      });
      return profile.profile.bearerToken;
    },
  });

  return (
    <SharingServerContext.Provider value={{ client, credential: () => token }}>
      {children}
    </SharingServerContext.Provider>
  );
}
