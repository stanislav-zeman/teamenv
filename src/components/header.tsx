import { projects, profile } from "@/app/links";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { NavigationLinks } from "./navbar/NavigationLinks";
import { FC, ReactNode } from "react";
import TeamENV from "@/icons/TeamEnv";

const Header: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="w-full">
      <nav className="flex flex-row h-16 bg-emerald-800 items-center just">
        <Link href={"/projects"} className="w-1/2 p-5 shrink">
          <TeamENV />
        </Link>
        <NavigationLinks />
        <div className="p-5">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  rootBox: "pr-[4em]",
                  userButtonPopoverActionButton__manageAccount: "hidden",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Header;
