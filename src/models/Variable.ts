import { Environment } from "@prisma/client";
import { BaseModel } from "./BaseModel";
import { boolean, lazy, mixed, object, string } from "yup";

export interface Variable extends BaseModel {
  name: string;
  value: string;
  hiddenVariable: {
    hidden: boolean;
  }[];
  environment: Environment;
}

export const VariableUpdateSchema = object()
  .shape({
    hidden: boolean().optional(),
    name: lazy((value) => {
      if (value)
        return string()
          .required()
          .min(3, "Name must be atleast three characters long!");
      return string().optional();
    }),
    value: string().optional(),
    environment: mixed<Environment>().oneOf(Object.values(Environment)).optional()
  })
  .required();

export const VariableCreateSchema = object()
  .shape({
    name: string()
      .required()
      .min(3, "Name must be atleast three characters long!"),
    value: string().required(),
    environment: mixed<Environment>().oneOf(Object.values(Environment)).required(),
  })
  .required();