import React from "react";
import logo from "@/assets/logo.svg";
import flag from "@/assets/flag.svg";
import Image from "next/image";
import Link from "next/link";
const MainNav = () => {
  return (
    <div className="h-[77px] bg-primary flex items-center justify-center border-b-2 border-white">
      <div className="container mx-auto flex items-center justify-between sm:px-5">
        <div className="flex items-center border-r-2 border-white pe-10">
          <Image src={flag} alt="" className="me-8" />
          <Image src={logo} alt="" />
        </div>
        <Link
          href="/login"
          className="text-blue-500 h-[77px] w-[160px] bg-white cursor-pointer flex items-center justify-center hover:bg-white/95 transition-[background] duration-200"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
