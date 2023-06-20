import {Variable} from "@prisma/client";

export type VariableCreateData = {
  userId: string
  projectId: string;
  name: string;
  value: string;
};

export type VariableUpdateData = {
  userId: string,
  variableId: string;
  name?: string;
  value?: string;
  hidden?: boolean,
};

export type VariableInfoData = Variable & {
  hiddenVariable: {
    hidden: boolean
  }[]
};
