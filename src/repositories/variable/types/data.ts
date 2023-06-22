import {Environment, Variable} from "@prisma/client";

export type VariableCreateData = {
  userId: string
  projectId: string;
  name: string;
  value: string;
  environment: Environment;
};

export type VariableUpdateData = {
  userId: string;
  variableId: string;
  name?: string;
  value?: string;
  hidden?: boolean;
  environment?: Environment;
};

export type VariableInfoData = Variable & {
  hiddenVariable: {
    hidden: boolean
  }[]
};
