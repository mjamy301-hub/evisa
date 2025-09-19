"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const me = await res.json();
      const role = me?.data?.role;
      if (role === "ADMIN") router.push("/users");
      else router.push("/applications");
    } else setErr("Invalid credentials");
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360 }}>
      <h1>Login</h1>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <label>
        Username
        <input value={username} onChange={(e) => setU(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setP(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
