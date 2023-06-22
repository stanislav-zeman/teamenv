"use client";

import {createContext} from "react";

export interface Palette {
  mode: "dark" | "light";
  primary: string;
  secondary: string;
  ternary: string;
}

export const defaultPalette: Palette = {
  mode: "light",
  primary: "#1E2D2F",
  secondary: "#F1AB86",
  ternary: "#F7DBA7",
};

interface IThemeContext {
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
