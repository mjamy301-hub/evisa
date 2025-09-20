import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Support = () => {
  return (
    <div className="bg-[#cdd7e7] py-20">
      <div className="max-w-screen-xl px-5 mx-auto sm:flex items-center justify-center gap-20">
        <div className="mb-6 sm:mb-0">
          <h3 className="text-[28px] text-blue-600/70 font-bold">Support</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="77"
            height="77"
            viewBox="0 0 24 24"
            className="sm:mx-auto mt-4 text-default"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1"
            >
              <path d="M22.5 10v13.5H.5V10m3-2l-3 2m22 0l-3-2" />
              <path d="m.5 23.5l8-6l-8-7.5m22 13.5l-8-6l8-7.5m-19 2.812V1.5h16v11.312M8.5 17.5h6" />
              <path d="M15.5 4.5h-2l-.5 1l.5 1h2l.5 1l-.5 1h-2m1-4v-1m0 6v-1m-8-3h3m-3 2h3m-3 2h4m-4 2h6" />
            </g>
          </svg>
        </div>
        <div>
          <p className="text-default font-semibold max-w-lg">
            If you have additional questions about the visa regime, permits and
            electronic services, please contact us:
          </p>
          <Link href="#!">
            <Button className="h-[44px] mt-6">Contact</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Support;
