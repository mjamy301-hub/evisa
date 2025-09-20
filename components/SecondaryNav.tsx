"use client";

import { useMe } from "@/hooks/useMe";
import { Role } from "@prisma/client";
import Link from "next/link";
import React from "react";

const SecondaryNav = () => {
  const { me } = useMe();

  return (
    <div className="h-[52px] bg-primary hidden sm:block">
      <div className="max-w-screen-xl mx-auto px-5 h-full">
        <div className="lg:w-5/6 h-full ms-auto border-l border-gray-400 flex items-center justify-between">
          <ul className="sm:flex h-full">
            {me && (
              <>
                <li className="h-full">
                  <Link
                    className="text-white h-full hover:bg-white hover:text-default px-6 font-semibold flex items-center justify-center border-r border-gray-400 text-nowrap"
                    href="/"
                  >
                    Home page
                  </Link>
                </li>
                <li className="h-full">
                  <Link
                    className="text-white h-full hover:bg-white hover:text-default px-6 font-semibold flex items-center justify-center border-r border-gray-400 text-nowrap"
                    href="/visa-c"
                  >
                    Visa C
                  </Link>
                </li>
                {me.Role === Role.USER && (
                  <li className="h-full">
                    <Link
                      className="text-white h-full hover:bg-white hover:text-default px-6 font-semibold flex items-center justify-center border-r border-gray-400 text-nowrap"
                      href={`/visa-d/${me.Application?.Id}`}
                    >
                      Visa D
                    </Link>
                  </li>
                )}
                <li className="h-full">
                  <Link
                    className="text-white h-full hover:bg-white hover:text-default px-6 font-semibold flex items-center justify-center border-r border-gray-400 text-nowrap"
                    href="/my-request"
                  >
                    My request
                  </Link>
                </li>
              </>
            )}
          </ul>
          <button className="text-white/80 flex items-center gap-2 text-xs font-normal flex-nowrap text-nowrap px-3">
            ЋИР LAT ENG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="-2 -2 24 24"
              className="text-blue-600"
            >
              <path
                fill="currentColor"
                d="M2.252 8A8 8 0 0 0 2 10c0 .69.088 1.36.252 2H5.1a20 20 0 0 1 0-4zm.818-2h2.346c.266-1.217.65-2.307 1.121-3.214A8.04 8.04 0 0 0 3.07 6m14.678 2H14.9a20 20 0 0 1 0 4h2.848a8.05 8.05 0 0 0 0-4m-.818-2a8.04 8.04 0 0 0-3.467-3.214c.472.907.855 1.997 1.121 3.214zM7.112 8A18 18 0 0 0 7 10c0 .685.038 1.355.112 2h5.776a17.8 17.8 0 0 0 0-4zm.358-2h5.06a10.8 10.8 0 0 0-.783-2.177C11.119 2.568 10.447 2 10 2s-1.119.568-1.747 1.823C7.938 4.455 7.673 5.19 7.47 6m-4.4 8a8.04 8.04 0 0 0 3.467 3.214c-.472-.907-.855-1.997-1.121-3.214zm13.86 0h-2.346c-.266 1.217-.65 2.307-1.121 3.214A8.04 8.04 0 0 0 16.93 14m-9.46 0c.203.81.468 1.545.783 2.177C8.881 17.432 9.553 18 10 18s1.119-.568 1.747-1.823c.315-.632.58-1.367.783-2.177zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondaryNav;
