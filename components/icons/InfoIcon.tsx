import React from "react";

const InfoIcon = () => {
  return (
    <div className="bg-[#e5bf3a] rounded-full w-6 h-6 flex items-center justify-center absolute top-2.5 -right-8 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.5 10.5h2V18m0 0H15m-2.5 0H10m1.5-11V6h1v1z"
        />
      </svg>
    </div>
  );
};

export default InfoIcon;
