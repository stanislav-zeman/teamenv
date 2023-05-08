import Image from "next/image";
import {
  auth,
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/common/LogoutButton";
import ProjectsContainer from "@/containers/ProjectsContainer";

export default function Home() {
  return (
    <main>
      <ProjectsContainer />
    </main>
  );
}
