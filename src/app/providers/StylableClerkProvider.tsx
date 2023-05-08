"use client";

import React, { FC, ReactNode } from "react";
import { useThemeContext } from "@/app/hooks/useThemeContext";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { redirect, useRouter } from "next/navigation";
import { ClientClerkProvider } from "@clerk/nextjs/dist/app-router/client/ClerkProvider";

const StylableClerkProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { palette } = useThemeContext();
  useRouter();

  return (
    <ClientClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{ baseTheme: palette.mode === "dark" ? dark : undefined }}
    >
      {children}
    </ClientClerkProvider>
  );
};

export default StylableClerkProvider;
