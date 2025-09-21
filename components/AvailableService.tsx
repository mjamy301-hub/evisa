import Link from "next/link";
import { Button } from "./ui/button";

export default function AvailableService() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-4xl px-6 pt-17.5 pb-20">
        <div className="md:flex">
          {/* Left headline */}
          <div className="md:min-w-sm">
            <p className="font-semibold mb-12 md:mb-0 tracking-tight text-default dark:text-white text-[34px]">
              Available <br /> services
            </p>
          </div>

          <div className="flex ps-12.5 flex-col gap-8 border-l-[10px] border-[#4a90e2]">
            <article className="relative border-b border-default/30 pb-8">
              <div>
                <h2 className="text-xl md:text-[28px] font-semibold text-default dark:text-white">
                  Visa C
                </h2>
                <p className="mt-8 max-w-2xl">
                  A short-stay visa C is a permit issued to a foreigner for
                  entry, transit and short-term stay on the territory of the
                  Republic of Serbia for up to 90 days.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="visa-c">
                    <Button size="lg" className="h-[44px]">
                      Start application
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

            <article className="relative pb-8 border-b border-default/30">
              <div>
                <h2 className="text-xl md:text-[28px] font-semibold text-default dark:text-white">
                  Visa D
                </h2>
                <h3 className="sr-only">Company services</h3>
                <p className="mt-8">
                  Visa D for a long stay is a permit issued to a foreigner for
                  entry and stay, and work in case when the visa is issued on
                  the basis of employment, in the territory of the Republic of
                  Serbia for a period of 90 to 180 days.
                </p>

                <div className="mt-6">
                  <Link href="/visa-d">
                    <Button size="lg" className="h-[44px]">
                      Start application
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
