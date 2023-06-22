import type {Project, ProjectUser, Role} from "@prisma/client";
import {VariableInfoData} from "@/repositories/variable/types/data";

export type ProjectCreateData = {
  userId: string;
  name: string;
  description: string;
};

export type ProjectUpdateData = {
  id: string;
  userId: string;
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
  variables: VariableInfoData[];
  users: ProjectUserData[];
};

export type Pageable<T> = {
  docs: T[]
  page: number
  pages: number
  limit: number
  total: number
};
