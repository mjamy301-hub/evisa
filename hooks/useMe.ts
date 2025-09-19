"use client";
import { Role } from "@prisma/client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json());

export function useMe() {
  const { data, error, isLoading, mutate } = useSWR("/api/auth/me", fetcher, {
    shouldRetryOnError: false
  });

  return {
    me: data?.success ? (data.data as { id: number; username: string; role: Role }) : null,
    loading: isLoading,
    error,
    refreshMe: () => mutate()
  };
}
