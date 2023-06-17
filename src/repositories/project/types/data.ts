import type {Project, ProjectUser, Variable} from "@prisma/client"

export type ProjectCreateData = {
  name: string;
  description: string;
};

export type ProjectUpdateData = {
  id: string;
  name?: string;
  description?: string;
};

export type ProjectData = Project & { variables: Variable[], users: ProjectUser[]};
