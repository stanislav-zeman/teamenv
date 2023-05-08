"use client";

import React, { ChangeEvent, ChangeEventHandler, FC } from "react";
import { useThemeContext } from "@/app/hooks/useThemeContext";

interface IGeneric {
  onChange?: (value: string) => void;
  value?: string;
}

const GenericLolInput: FC<IGeneric> = ({ onChange, value }) => {
  const { palette } = useThemeContext();

  const darkMode = palette.mode === "dark";
  const bgString = darkMode ? "bg-stone-900" : "bg-neutral-100";
  const borderColor = darkMode ? "border-neutral-100" : "border-stone-900";
  const textString = darkMode ? "text-white" : "text-black";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  const props = value ? { value, onChange: handleChange } : {};

  return (
    <input
      className={`${bgString} ${textString} ${borderColor} border rounded-md px-2 py`}
      {...props}
    />
  );
};

export default GenericLolInput;
