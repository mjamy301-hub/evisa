"use client";

import UsersTable from "@/components/UsersTable";
import AddUserForm from "@/components/AddUserForm";

export default function UsersPage() {
  return (
    <div className="py-20 max-w-screen-xl mx-auto px-5">
      <h1 className="text-3xl font-bold mb-10">Users</h1>
      <AddUserForm />
      <UsersTable />
    </div>
  );
}
