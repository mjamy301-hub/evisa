import Link from "next/link";
import { Button } from "./ui/button";

export default function Service() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-4xl px-6 pt-17.5 pb-20">
        <div className="md:flex">
          {/* Left headline */}
          <div className="md:w-sm">
            <p className="font-semibold mb-12 md:mb-0 tracking-tight text-default dark:text-white text-[34px]">
              All eServices <br /> in one place
            </p>
          </div>

          <div className="flex flex-col gap-16">
            <article className="relative">
              <div className="pl-12.5 border-l-[10px] border-gray-300">
                <h2 className="text-xl md:text-[28px] font-semibold text-default dark:text-white">
                  For foreign citizens
                </h2>
                <p className="mt-8 max-w-2xl">
                  Apply for visa C, visa D or temporary residence approval in
                  Republic of Serbia.
                  <br />
                  <br />
                  List of available services will be presented after you login.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/login">
                    <Button size="lg" className="h-[44px] font-bold">
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/login"
                    className="text-blue-600/80 font-bold underline mt-2 ms-8"
                  >
                    Register an account
                  </Link>
                </div>
              </div>
            </article>

            <article className="relative">
              <div className="pl-12.5 border-l-[10px] border-[#4a90e2]">
                <h2 className="text-xl md:text-[28px] font-semibold text-default dark:text-white">
                  For companies in Republic of Serbia
                </h2>
                <h3 className="sr-only">Company services</h3>
                <p className="mt-8">
                  Apply if you wish to employe one or more foreign citizens.
                </p>
                <p className="mt-8">
                  eServices available for companies are group visa D and group
                  temporary residence,
                </p>
                <p className="mt-8">
                  and unified permit for temporary residence and work.
                </p>
                <p className="mt-8">
                  To access eServices register on eGovernment Portal.
                </p>

                <div className="mt-6">
                  <Link href="#">
                    <Button className="font-bold bg-[#4a90e2] h-[44px]">
                      Open eGovernment Portal
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
