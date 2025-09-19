"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  Id: string;
  Username: string;
  Role: "ADMIN" | "USER";
  CreatedAt: string;
  Application?: { Id: string; Status: string };
};

export default function UsersPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [nu, setNu] = useState("");
  const [pw, setPw] = useState("");
  const router = useRouter();

  async function load() {
    const res = await fetch(`/api/users?search=${encodeURIComponent(q)}`);
    const json = await res.json();
    setItems(json.data.items);
  }
  useEffect(() => {
    load();
  }, []);

  async function createUser() {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: nu, password: pw })
    });
    if (res.ok) {
      setShow(false);
      setNu("");
      setPw("");
      await load();
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Search username" value={q} onChange={(e) => setQ(e.target.value)} />
        <button onClick={load}>Search</button>
        <button onClick={() => setShow(true)}>Add User</button>
      </div>
      <table style={{ width: "100%", marginTop: 12 }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((u) => (
            <tr
              key={u.Id}
              onClick={() => u.Application && router.push(`/applications/${u.Application.Id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{u.Username}</td>
              <td>{u.Role}</td>
              <td>{u.Application?.Status ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {show && (
        <div style={{ border: "1px solid #ddd", padding: 12, marginTop: 12 }}>
          <h3>Add User</h3>
          <input placeholder="Username" value={nu} onChange={(e) => setNu(e.target.value)} />
          <input placeholder="Password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={createUser}>Create</button>
            <button onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
