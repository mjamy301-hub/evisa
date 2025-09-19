import Link from "next/link";
import { Button } from "./ui/button";

export default function Yellow() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-xl bg-[#e5bf3a]">
          {/* Big decorative world icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="330"
            viewBox="-2 -2 24 24"
            className="absolute -top-20 -left-20 text-white hidden md:block"
          >
            <path
              fill="currentColor"
              d="M2.252 8A8 8 0 0 0 2 10c0 .69.088 1.36.252 2H5.1a20 20 0 0 1 0-4zm.818-2h2.346c.266-1.217.65-2.307 1.121-3.214A8.04 8.04 0 0 0 3.07 6m14.678 2H14.9a20 20 0 0 1 0 4h2.848a8.05 8.05 0 0 0 0-4m-.818-2a8.04 8.04 0 0 0-3.467-3.214c.472.907.855 1.997 1.121 3.214zM7.112 8A18 18 0 0 0 7 10c0 .685.038 1.355.112 2h5.776a17.8 17.8 0 0 0 0-4zm.358-2h5.06a10.8 10.8 0 0 0-.783-2.177C11.119 2.568 10.447 2 10 2s-1.119.568-1.747 1.823C7.938 4.455 7.673 5.19 7.47 6m-4.4 8a8.04 8.04 0 0 0 3.467 3.214c-.472-.907-.855-1.997-1.121-3.214zm13.86 0h-2.346c-.266 1.217-.65 2.307-1.121 3.214A8.04 8.04 0 0 0 16.93 14m-9.46 0c.203.81.468 1.545.783 2.177C8.881 17.432 9.553 18 10 18s1.119-.568 1.747-1.823c.315-.632.58-1.367.783-2.177zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10"
              strokeWidth="0.0002"
              stroke="currentColor"
            />
          </svg>

          {/* Content */}
          <div className="relative z-10 grid items-center px-6 py-8  md:pl-80 lg:pl-100">
            <div className="max-w-3xl">
              <h2 className="text-[26px] font-semibold leading-tight text-default/90">
                Did you find the service
                <br className="hidden sm:block" /> you are looking for?
              </h2>

              <p className="mt-4 text-white">
                Learn more about the visa regime. Find more information,
                instructions and documentation needed on Entry &amp; Stay
                Regulations.
              </p>

              <div className="mt-6">
                <Link href="#">
                  <Button className="h-[44px] font-bold border-1 border-white">
                    Entry &amp; Stay Regulations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
