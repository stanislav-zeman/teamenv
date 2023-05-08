"use client";
import React from "react";
import { useClerk } from "@clerk/nextjs";

function LogoutButton() {
  const { signOut, user } = useClerk();
  return <button onClick={() => signOut()}>Sign out</button>;
}

export default LogoutButton;
