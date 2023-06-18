import {Role} from "@prisma/client";
import {getRole} from "@/repositories/user/read";
import {ModifyMemberData} from "@/repositories/user/types/data";

type Deletable = {
  deletedAt: Date | null;
}

export function getPrismaRoles(role: number | undefined): Role[] {
  switch (role) {
    case 3:
      return [Role.OWNER]
    case 2:
      return [Role.MAINTAINER, Role.OWNER]
    case 1:
      return [Role.DEVELOPER, Role.MAINTAINER, Role.OWNER]
    case 0:
      return [Role.GUEST, Role.DEVELOPER, Role.MAINTAINER, Role.OWNER]
    default:
      throw new Error("Invalid role!")
  }
}

function getRolePriority(role: Role): number {
  switch (role) {
    case "GUEST":
      return 0;
    case "DEVELOPER":
      return 1;
    case "MAINTAINER":
      return 2;
    case "OWNER":
      return 3;
    default:
      return -1;
  }
}

export function isDeleted(o: Deletable): boolean {
  return o.deletedAt !== null;
}

export async function hasAtLeastRole(userId: string, projectId: string, role: Role): Promise<boolean> {
  const memberRole = await getRole(userId, projectId);
  if (memberRole.isOk) {
    return getRolePriority(memberRole.unwrap()) >= getRolePriority(role);
  }
  return false;
}

export async function canModify(data: ModifyMemberData): Promise<boolean> {
  const userRole = await getRole(data.userId, data.projectId);
  const memberRole = await getRole(data.memberId, data.projectId);

  if (userRole.isErr || memberRole.isErr) {
    throw new Error("Failed to retrieve roles!");
  }

  const priorityDiff = getRolePriority(userRole.unwrap()) - getRolePriority(memberRole.unwrap());
  return priorityDiff > 0;
}

