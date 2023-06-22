"use client";
import { saveAs } from "file-saver";
import { Variable } from "@/models/Variable";
import useFilters from "@/app/hooks/useFilters";
import { Environment } from "@prisma/client";

const filterHiddenAndEnvironment = (variables: Variable[], env: Environment) =>
  variables.filter(
    (variable) =>
      !variable.hiddenVariable[0].hidden && variable.environment === env
  );

export const generateEnvFile = (variables: Variable[], environment: Environment, fileName = ".env") => {
  console.log(variables);
  let content = "";
  const filtered = filterHiddenAndEnvironment(variables, environment);
  filtered.forEach(
    (variable) =>
      (content = content.concat(`${variable.name}=${variable.value}\n`))
  );
  var blob = new Blob([content], { type: "text/text;charset=utf-8" });
  saveAs(blob, fileName);
};
