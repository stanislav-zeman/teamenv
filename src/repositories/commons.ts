import {Role} from "@prisma/client";
import {getRole} from "@/repositories/user/read";

type Deletable = {
  deletedAt: Date | null;
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

async function hasAtLeastRole(userId: string, projectId: string, role: Role): Promise<boolean> {
  const memberRole = await getRole(userId, projectId);
  if (memberRole.isOk) {
    return getRolePriority(memberRole.unwrap()) >= getRolePriority(role);
  }
  return false;
}

