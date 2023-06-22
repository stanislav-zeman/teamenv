import { Environment } from "@prisma/client";
import { BaseModel } from "./BaseModel";

export interface Variable extends BaseModel {
  name: string;
  value: string;
  hiddenVariable: {
    hidden: boolean;
  }[];
  environment: Environment;
}

