"use client";

import AvailableService from "@/components/AvailableService";
import { Hero } from "@/components/Hero";
import LoadMe from "@/components/LoadMe";
import Service from "@/components/Service";
import Support from "@/components/Support";
import Yellow from "@/components/Yellow";
import { useMe } from "@/hooks/useMe";

export default function Home() {
  const { me } = useMe();
  return (
    <div>
      <Hero />
      {me?.Id ? <AvailableService /> : <Service />}
      <Yellow />
      <Support />
      <LoadMe />
    </div>
  );
}
