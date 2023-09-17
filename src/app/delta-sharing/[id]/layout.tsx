"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { SharingServerContext, useSharingServer } from "@/components";

export default function SharingServerLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}): JSX.Element {
  const { client } = useSharingServer(params.id);
  const { data: token } = useSuspenseQuery({
    queryKey: ["sharing-server-token", params.id],
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
