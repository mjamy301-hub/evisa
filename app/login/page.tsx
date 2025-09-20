import { CircleUserRound, IdCard } from "lucide-react";
import MobileIcon from "@/components/icons/MobileIcon";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <>
      <section className="py-4.5 bg-[#eee]">
        <div className="max-w-screen-xl px-5 mx-auto font-medium">
          <div className="px-10">
            <h2 className="text-3xl text-primary opacity-[0.85]">Login</h2>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-screen-xl px-5 py-5 mx-auto">
          <div className="px-10">
            <ul className="grid grid-cols-3 border border-primary text-center text-sm font-medium">
              <li className="bg-primary text-white cursor-pointer py-2.5 flex justify-start items-center gap-3 px-7">
                <CircleUserRound
                  size={30}
                  strokeWidth={1.6}
                  className="text-white"
                />
                <span>Username and password</span>
              </li>
              <li className="text-primary cursor-pointer py-2.5 flex justify-start items-center gap-3 px-7 border-r border-primary">
                <IdCard size={30} strokeWidth={1.6} className="text-primary" />
                <span>Qualified electronic certificate</span>
              </li>
              <li className="text-primary cursor-pointer py-2.5 flex justify-start items-center gap-3 px-7 border-r border-primary">
                <MobileIcon />
                <span>Mobile application</span>
              </li>
            </ul>
            <div className="bg-[#f3f9ff]">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3" />
                <div className="col-span-6">
                  <div className="my-4 flex justify-center">
                    <CircleUserRound
                      size={55}
                      strokeWidth={1.2}
                      className="text-primary"
                    />
                  </div>
                  <p className="text-sm font-medium text-primary text-center mb-11">
                    Login with a username and password is a basic security
                    login.
                    <a href="#!" className="font-bold underline ml-1">
                      Find out more.
                    </a>
                  </p>
                  <div className="px-12 pb-6">
                    <LoginForm />
                    <Link
                      href="#!"
                      className="text-sm text-primary font-bold underline mb-6 block"
                    >
                      Password forgotten?
                    </Link>
                    <p className="text-sm text-primary font-medium text-center">
                      Don&apos;t have an account at eid.gov.rs? Register{" "}
                      <Link href="#!" className="font-bold underline">
                        Here
                      </Link>{" "}
                    </p>
                  </div>
                </div>
                <div className="col-span-3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
