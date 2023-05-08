import { projects, profile, settings } from "@/app/links";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="flex flex-row h-16 bg-emerald-800 items-center just">
      <Link href={"/"} className="w-1/2 p-5 shrink">
        <h1>TeamENV</h1>
      </Link>
      <div className="flex items-stretch justify-around w-1/2">
        <Link href={projects.path}>{projects.label}</Link> |
        <Link href={profile.path}>{profile.label}</Link> |
        <Link href={settings.path}>{settings.label}</Link> |
      </div>
      <div className="p-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  )
}

export default Header;