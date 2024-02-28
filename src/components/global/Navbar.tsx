import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import Image from "next/image";
import gn from '../../../public/gammanotes.png';


export async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
       
        <Link href="/" className="w-full flex gap-2 justify-left items-center">
          <Image
          className="text-primary"
          src={gn}
          alt="Logo"
          width={30}
          height={30}/>
          <span className="font-bold text-3xl">
            Gamma <span className="text-primary">Notes</span>
          </span>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          {(await isAuthenticated()) ? (
            <UserNav
              email={user?.email as string}
              image={user?.picture as string}
              name={user?.given_name as string}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>Sign In</Button>
              </LoginLink>

              <RegisterLink>
                <Button variant="secondary">Sign Up</Button>
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
