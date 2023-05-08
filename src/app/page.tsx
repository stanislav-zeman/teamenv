import Image from "next/image";
import { auth, SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/common/LogoutButton";

export default function Home() {
  return (
    <main>
      <SignedIn>
        <h1>You are Signed In</h1>
        <LogoutButton />
      </SignedIn>
    </main>
  );
}
