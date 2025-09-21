"use client";
import { Prisma } from "@prisma/client";
import useSWR from "swr";

export type Me = Prisma.UserGetPayload<{
  select: {
    Id: true;
    Username: true;
    Role: true;
    Application: {
      select: {
        Id: true;
        Status: true;
      };
    };
  };
}>;

type Api<T> = { success: true; data: T } | { success: false };

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((r) => r.json());

export function useMe() {
  const { data, error, isLoading, mutate } = useSWR<Api<Me>>(
    "/api/auth/me",
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  return {
    me: data?.success ? data.data : null,
    loading: isLoading,
    error,
    refreshMe: () => mutate(),
  };
}
