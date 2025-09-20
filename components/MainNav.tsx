"use client";

import React, { useState } from "react";
import logo from "@/assets/logo.svg";
import flag from "@/assets/flag.svg";
import Image from "next/image";
import Link from "next/link";
import { useMe } from "@/hooks/useMe";
import { LogOut, UserCircleIcon } from "lucide-react";
const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { me } = useMe();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      window.location.reload();
    }
  };

  return (
    <div className="h-[77px] bg-primary border-b-2 border-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between sm:px-5">
        <div className="flex items-center border-r-2 border-white pe-10">
          <Image src={flag} alt="" className="me-8" />
          <Image src={logo} alt="" />
        </div>
        {!me?.Id && (
          <Link
            href="/login"
            className={`text-blue-500 h-[77px] w-[160px] bg-white cursor-pointer items-center justify-center hover:bg-white/95 transition-[background] duration-200`}
          >
            <span className={`${!me?.Id ? "flex" : "hidden"}`}>{me?.Id}</span>
          </Link>
        )}
        {me?.Id && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-default h-[77px] w-[160px] bg-white cursor-pointer flex items-center justify-center hover:bg-white/95 transition-[background] duration-200 px-4 gap-2"
            >
              <p className="flex-1 text-nowrap truncate">{me?.Username}</p>
              <UserCircleIcon className="w-7 h-7" />
            </button>
            <button
              onClick={handleLogout}
              className={`w-full h-[38px] bg-white text-default font-bold border-t border-default flex items-center justify-center gap-3 absolute cursor-pointer ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              <LogOut className="text-blue-500" />
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNav;
