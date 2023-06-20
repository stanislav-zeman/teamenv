import type { Project, ProjectUser, Role, Variable } from "@prisma/client";

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
  id: string;
  role: Role;
  user: {
    id: string;
    username: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
  };
};

export type OwnerInfo = ProjectUser & {
  user: { username: string; avatarUrl: string };
};

export type ProjectSummary = Project & {
  owner: OwnerInfo;
  myRole: Role | undefined;
};

export type ProjectData = Project & {
  myRole: Role;
  variables: Variable[];
  users: ProjectUserData[];
};
