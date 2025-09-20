"use client";
import { SWRConfig } from "swr";

export function SWRProvider({ children, fallback }: { children: React.ReactNode; fallback: unknown }) {
  return (
    <SWRConfig
      value={{
        fallback,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        dedupingInterval: 10000
      }}
    >
      {children}
    </SWRConfig>
  );
}
