import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a request",
  description: "Welcome to Serbia",
};

export default function VisaCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
