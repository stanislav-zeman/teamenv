"use client";

import React, { FC, ReactNode } from "react";
import { useThemeContext } from "@/app/hooks/useThemeContext";

const AdaptiveBackground: FC<{ children?: ReactNode }> = ({ children }) => {
  const { palette } = useThemeContext();
  const darkMode = palette.mode === "dark";
  const bgString = darkMode ? "bg-stone-900" : "bg-neutral-100";
  const textString = darkMode ? "text-white" : "text-black";

  return (
    <div className={`w-screen ${bgString} h-screen ${textString}`}>
      {children}
    </div>
  );
};

export default AdaptiveBackground;
