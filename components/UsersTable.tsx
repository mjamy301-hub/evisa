/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApplicationStatus, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function UsersTable() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data.items))
      .catch((err) => console.error(err));
  }, []);

  const handleStatus = async (id: number, value: string) => {
    const res = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Status: value }),
    });
    await res.json();
  };

  return (
    <Table className="mb-20">
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: any) => (
          <TableRow key={user.Id}>
            <TableCell>
              <Select
                name="Status"
                defaultValue={user.Application.Status}
                onValueChange={(value) =>
                  handleStatus(user.Application.Id, value)
                }
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value={ApplicationStatus.REQUEST_SUBMITTED}>
                      Request submitted
                    </SelectItem>
                    <SelectItem value={ApplicationStatus.DRAFT_REQUEST}>
                      Draft Request
                    </SelectItem>
                    <SelectItem value={ApplicationStatus.PROCESSING}>
                      Processing
                    </SelectItem>
                    <SelectItem value={ApplicationStatus.APPROVED}>
                      Approved
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{user.Email}</TableCell>
            <TableCell>
              <Link href={`/visa-d/${user.Application.Id}`}>
                <Button>Edit Detail</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
