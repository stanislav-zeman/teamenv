import type {Project, ProjectUser, Role, Variable} from "@prisma/client"

export type ProjectCreateData = {
  name: string;
  description: string;
};

export type ProjectUpdateData = {
  id: string;
  name?: string;
  description?: string;
};

export type ProjectData = Project & { myRole: Role, variables: Variable[], users: ProjectUser[]};
