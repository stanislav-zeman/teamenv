import type {Project, Role, Variable} from "@prisma/client"

export type ProjectCreateData = {
  name: string;
  description: string;
};

export type ProjectUpdateData = {
  id: string;
  name?: string;
  description?: string;
};

export type ProjectUserData = {
  role: Role;
  user: {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
  }
}

export type ProjectData = Project & { variables: Variable[], users: ProjectUserData[]};
