"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import signinIcon from "@/assets/sign-in.svg";
import clsx from "clsx";
import { useMe } from "@/hooks/useMe";

const LoginForm = () => {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState({
    username: "",
    password: ""
  });
  const [passwordShow, setPasswordShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshMe } = useMe();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError({
      username: "",
      password: ""
    });

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (!res.ok) {
      const error = data.error;
      setError(error);
      return;
    }

    await refreshMe();
    const next = searchParams.get("next");
    router.replace(next ?? "/");
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="text-sm font-bold text-primary block mb-1">
          Username:
        </label>
        <p className="text-xs font-medium text-primary">(Email address used during registration)</p>
        <div className="relative after:absolute after:h-[3px] after:bg-[#c9dadf] after:left-[3px] after:right-[3px] after:-bottom-[3px]">
          <input
            className="bg-white h-[50px] px-4 text-primary font-medium border border-primary w-full focus:ring-0 focus:outline-0"
            id="username"
            value={username}
            onChange={(e) => setU(e.target.value)}
            required
          />
        </div>
        {error.username && <p className="text-xs text-red-600">{error.username}</p>}
      </div>
      <div className="mb-10">
        <label htmlFor="password" className="text-sm font-bold text-primary block mb-1">
          Your password:
        </label>

        <div className="relative after:absolute after:h-[3px] after:bg-[#c9dadf] after:left-[3px] after:right-[3px] after:-bottom-[3px]">
          <input
            className="bg-white h-[50px] px-4 text-primary font-medium border border-primary w-full focus:ring-0 focus:outline-0"
            id="password"
            value={password}
            type={passwordShow ? "text" : "password"}
            onChange={(e) => setP(e.target.value)}
            required
          />
          <span
            className={clsx(
              "absolute right-[1px] top-[1px] h-12 bg-[#f3f9ff]",
              "transition-[width] duration-300 ease-in-out", // applies in both states
              passwordShow ? "w-0" : "w-[100px]"
            )}
          />
          <span
            className="absolute top-[14px] right-6 cursor-pointer text-xs font-medium"
            onClick={() => setPasswordShow((prev) => !prev)}
          >
            SHOW
          </span>
        </div>
        {error.password && <p className="text-xs text-red-600">{error.password}</p>}
      </div>
      <button
        type="submit"
        className="bg-[#017932] w-full p-4 text-[18px] font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
      >
        <div className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center">
          <Image src={signinIcon} width={20} height={20} alt="signin" />
        </div>
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
