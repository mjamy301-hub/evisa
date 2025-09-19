import Image from "next/image";
import React from "react";
import logo from "@/assets/logo2.png";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="container px-5 pb-12 mx-auto">
        <div className="flex items-start gap-4">
          <Image src={logo} alt="logo2" width={60} />
          <div className="mt-6">
            <h3 className="text-[26px] font-semibold">
              welcometoserbia.gov.rs
            </h3>
            <h4 className="font-medium mb-6">Welcome to Serbia</h4>
            <p className="text-xs max-w-md text-gray-500 font-semibold">
              The Website is licensed under a{" "}
              <Link href="#!" className="text-gray-950 underline">
                Creative Commons{" "}
              </Link>
              Attribution-NonCommercial-No Derivs 3.0 Serbia License. Web
              project{" "}
              <Link href="#!" className="text-gray-950 underline">
                ite.gov.rs
              </Link>
            </p>
            <Link href="#!" className="text-blue-500">
              Privacy Policy and terms of Use
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
