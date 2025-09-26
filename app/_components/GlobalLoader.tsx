"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); // show on initial reload

  useEffect(() => {
    // Show on every route change
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600); // adjust duration
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      {/* Arc spinner */}
      <svg
        className="animate-[spin_7s_linear_infinite_reverse] text-white"
        width="70"
        height="70"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          pathLength="360"
          strokeDasharray="48 42"
        />
      </svg>
    </div>
  );
}
