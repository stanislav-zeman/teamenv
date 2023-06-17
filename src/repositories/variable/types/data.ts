import {Role} from "@prisma/client";

export type VariableCreateData = {
  projectId: string;
  name: string;
  value: string;
  minimalAccessRole?: Role;
};

export type VariableUpdateData = {
  id: string;
  name?: string;
  value?: string;
  minimalAccessRole?: Role;
  editor: string;
};
