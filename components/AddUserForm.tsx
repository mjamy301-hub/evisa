"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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

    const data = await res.json();

    if (!res.ok) {
      console.log("Error occurs");
    }

    if (res.ok) {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:max-w-sm mb-10"
    >
      <Input onChange={handleChange} name="Username" />
      <Input onChange={handleChange} name="Password" />
      <Button type="submit">Create</Button>
    </form>
  );
};

export default AddUserForm;
