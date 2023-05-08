"use client";

import React, { FC, ReactNode, useState } from "react";
import { Theme } from "@clerk/types";
import {
  defaultPalette,
  Palette,
  ThemeContext,
} from "@/app/contexts/ThemeContext";

export const getPaletteFromLS = () => {
  const palette = localStorage.getItem("palette");
  if (!palette) return defaultPalette;
  return JSON.parse(palette) as Palette;
};

const savePaletteToLS = (palette: Palette) =>
  localStorage.setItem("palette", JSON.stringify(palette));

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [palette, setPalette] = useState<Palette>(getPaletteFromLS());

  const handlePaletteChange = (palette: Palette) => {
    savePaletteToLS(palette);
    setPalette(palette);
  };

  return (
    <ThemeContext.Provider value={{ palette, setPalette: handlePaletteChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
