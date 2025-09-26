import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submitted requests",
  description: "Welcome to serbia",
};

export default function VisaCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
