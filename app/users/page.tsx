"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UsersTable from "@/components/UsersTable";
import AddUserForm from "@/components/AddUserForm";

export default function UsersPage() {
  return (
    <div className="py-20 max-w-screen-xl mx-auto px-5">
      <h1 className="text-3xl font-bold mb-10">Users</h1>
      <Dialog>
        <DialogTrigger asChild className="mb-5">
          <Button className="bg-blue-500 hover:bg-blue-700">
            Add New User
          </Button>
        </DialogTrigger>
        <AddUserForm />
      </Dialog>
      <UsersTable />
    </div>
  );
}
