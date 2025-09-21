/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApplicationStatus } from "@prisma/client";
import { useEffect, useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data.items))
      .catch((err) => console.error(err));
  }, []);

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
              <Select name="Status" defaultValue={user.Application.Status}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Country</SelectLabel>
                    <SelectItem value={ApplicationStatus.REQUEST_SUBMITTED}>Request submitted</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>{user.Email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
