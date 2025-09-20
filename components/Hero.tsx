import React from "react";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-600 to-slate-700 text-white py-[140px]">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.png')",
        }}
      />
      <div className="relative max-w-screen-xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-8">
          Welcome to eServices
        </h1>
        <p className="text-base max-w-3xl mx-auto font-bold">
          Here you can use electronic services of diplomatic and consular
          offices and other competent authorities of the Republic of Serbia.
        </p>
      </div>
    </section>
  );
};
