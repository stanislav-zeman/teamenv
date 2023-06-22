import {Role} from "@prisma/client";

export type APIKey = string;

export type EnsureUserData = {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
};

export type ModifyMemberData = {
  userId: string;
  projectId: string;
  memberId: string;
};

export type CreateProjectMemberData = {
  userId: string;
  memberId: string;
  projectId: string;
  role: Role;
};
