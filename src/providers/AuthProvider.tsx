"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { auth, useClerk } from "@clerk/nextjs";

import { signIn, UnathorizedLinks } from "@/app/links";
import { redirect, usePathname, useRouter } from "next/navigation";

const pathnameUnathorized = (pathname: string) =>
  Object.values(UnathorizedLinks).some((link) => link.path.includes(pathname));

const AuthProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { user } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  if (!pathnameUnathorized(pathname) && !user) {
    redirect(signIn.path);
  }

  return <>{children}</>;
};

export default AuthProvider;
