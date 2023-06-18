import {Role} from "@prisma/client";


export type ProjectMemberData = {
  memberId: string;
  role: Role;
};

export type ProjectMemberUpdateData = {
  role: Role;
};

export type VariableCreateData = {
  name: string;
  value: string;
}

export type ProjectParams = {
  projectId: string;
};

export type MemberParams = {
  projectId: string;
  memberId: string,
};

export type VariableParams = {
  projectId: string;
  variableId: string;
};
