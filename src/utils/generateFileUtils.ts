"use client";
import {saveAs} from "file-saver";
import {Variable} from "@/models/Variable";
import {Environment} from "@prisma/client";

const filterHiddenAndEnvironment = (variables: Variable[], env: Environment) =>
  variables.filter(
    (variable) =>
      !variable.hiddenVariable[0].hidden && variable.environment === env
  );

export const generateEnvFile = (variables: Variable[], environment: Environment, fileName = ".env") => {
  let content = "";
  const filtered = filterHiddenAndEnvironment(variables, environment);
  console.log(filtered)
  filtered.forEach(
    (variable) =>
      (content = content.concat(`${variable.name}=${variable.value}\n`))
  );
  var blob = new Blob([content], { type: "text/text;charset=utf-8" });
  saveAs(blob, fileName);
};
