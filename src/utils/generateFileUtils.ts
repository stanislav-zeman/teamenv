"use client";
import { saveAs } from "file-saver";
import { Variable } from "@/models/Variable";

const filterHidden = (variables: any[]) =>
  variables.filter((variable) => !variable?.hidden);

export const generateEnvFile = (variables: Variable[], fileName = ".env") => {
  console.log(variables);
  let content = "";
  const filtered = filterHidden(variables);
  filtered.forEach(
    (variable) =>
      (content = content.concat(`${variable.name}=${variable.value}\n`))
  );
  var blob = new Blob([content], { type: "text/text;charset=utf-8" });
  saveAs(blob, fileName);
};
