import AvailableService from "@/components/AvailableService";
import Footer from "@/components/Footer";
import { Hero } from "@/components/Hero";
import LoadMe from "@/components/LoadMe";
import MainNav from "@/components/MainNav";
import SecondaryNav from "@/components/SecondaryNav";
import Service from "@/components/Service";
import Support from "@/components/Support";
import Yellow from "@/components/Yellow";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <Service />
      {/* <AvailableService /> */}
      <Yellow />
      <Support />
      <LoadMe />
    </div>
  );
}
