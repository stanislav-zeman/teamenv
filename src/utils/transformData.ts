import { Member } from "@/models/Member";
import { MyProject } from "@/models/Project";
import { Variable } from "@/models/Variable";
import { ProjectData } from "@/repositories/project/types/data";
import { UserInfo } from "@/models/User";

export const transformProjectData = (data: ProjectData): MyProject => {
  const {
    users: members,
    variables: vars,
    myRole,
    id,
    name,
    description,
    createdAt,
  } = data;
  const owner: UserInfo = {
    id: members[0].user.id,
    username: members[0].user.username,
  };
  const users: Member[] = members.map(({ user, role }) => ({
    id: user.id,
    username: user.username,
    role: role,
    avatarUrl: user.avatarUrl
  }));
  const variables: Variable[] = vars.map(({ id, name, value }) => ({
    id,
    name,
    value,
  }));
  return { id, name, description, owner, createdAt, myRole, users, variables };
};
