"use client";

import AddUserForm from "@/components/AddUserForm";
import { Button } from "@/components/ui/button";
import UsersTable from "@/components/UsersTable";
import { useMe } from "@/hooks/useMe";
import Link from "next/link";
import React, { useEffect } from "react";

const MyRequest = () => {
  const { me } = useMe();
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/users");
    };
    getUser();
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto px-5 sm:px-12">
      <h1 className="text-center text-5xl font-bold py-10 text-default">
        List of previously sent requests
      </h1>
      <div className="overflow-auto border-y border-gray-300 mt-10 mb-20">
        <div className="flex flex-nowrap justify-between">
          <div className="p-4.5">
            <h3 className="text-[#a0a0a0] text-sm font-medium text-nowrap">
              Request number
            </h3>
            <h4 className="font-semibold text-default text-nowrap">286663</h4>
          </div>
          <div className="p-4.5">
            <h3 className="text-[#a0a0a0] text-sm font-medium text-nowrap">
              First and last name
            </h3>
            <h4 className="font-semibold text-default text-nowrap">MD HABIB</h4>
          </div>
          <div className="p-4.5">
            <h3 className="text-[#a0a0a0] text-sm font-medium text-nowrap">
              Status
            </h3>
            {me?.Application?.Status === "REQUEST_SUBMITTED" && (
              <span className="bg-[#4a90e2] text-sm text-white leading-[1.5] block font-medium min-w-[170px]">
                Request submitted
              </span>
            )}
            {me?.Application?.Status === "DRAFT_REQUEST" && (
              <span className="bg-[#e5bf3a] text-sm text-white leading-[1.5] block font-medium min-w-[170px]">
                Draft request
              </span>
            )}
            {me?.Application?.Status === "PROCESSING" && (
              <span className="bg-purple-500 text-sm text-white leading-[1.5] block font-medium min-w-[170px]">
                Processing
              </span>
            )}
            {me?.Application?.Status === "APPROVED" && (
              <span className="bg-green-500 text-sm text-white leading-[1.5] block font-medium min-w-[170px]">
                Approved
              </span>
            )}
          </div>
          <div className="p-4.5">
            <h3 className="text-[#a0a0a0] text-sm font-medium text-nowrap">
              Visa
            </h3>
            <h4 className="font-semibold text-default text-nowrap">Visa D</h4>
          </div>
          <div className="p-4.5">
            <h3 className="text-[#a0a0a0] text-sm font-medium text-nowrap">
              Vis Id
            </h3>
            <h4 className="font-semibold text-default text-nowrap">400934</h4>
          </div>
          <div className="p-4.5">
            <Link href={`/visa-d/${me?.Application?.Id}`}>
              <Button className="h-[44px] font-bold">
                Open <br /> Request
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
