import { Member } from "@/models/Member";
import { MyProject } from "@/models/Project";
import { Variable } from "@/models/Variable";
import { ProjectData } from "@/repositories/project/types/data";
import { Role } from "@prisma/client";
import { UserInfo } from "@/models/User";
import * as RoleModel from "@/models/Role"

const decodeRole = (role: Role) => {
  if (role === Role.GUEST) return 0;
  if (role === Role.DEVELOPER) return 1;
  if (role === Role.MAINTAINER) return 2;
  return 3;
};

export const transformProjectData = (data: ProjectData): MyProject => {
  const {
    users: members,
    variables: vars,
    myRole: role,
    id,
    name,
    description,
    createdAt,
  } = data;
  const myRole: RoleModel.Role = decodeRole(role);
  const owner: UserInfo = {
    id: members[0].userId,
    username: members[0].user.username,
  };
  const users: Member[] = members.map(({ userId, user, role }) => ({
    id: userId,
    username: user.username,
    role: decodeRole(role),
  }));
  const variables: Variable[] = vars.map(({ id, name, value }) => ({
    id,
    name,
    value,
  }));
  return { id, name, description, owner, createdAt, myRole, users, variables };
};
