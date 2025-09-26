"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AddUserForm = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.log("Error occurs");
    }

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit} className="flex flex-col sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="mb-4">Add user</DialogTitle>
        </DialogHeader>
        <label className="text-sm" htmlFor="email">
          Email
        </label>
        <Input onChange={handleChange} name="Email" className="mb-3" />
        <label className="text-sm" htmlFor="Password">
          Password
        </label>
        <Input onChange={handleChange} name="Password" className="mb-3" />
        <label className="text-sm" htmlFor="RequestNumber">
          Request Number
        </label>
        <Input onChange={handleChange} name="RequestNumber" className="mb-3" />
        <label className="text-sm" htmlFor="VisId">
          Vis Id
        </label>
        <Input onChange={handleChange} name="VisId" className="mb-3" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AddUserForm;
