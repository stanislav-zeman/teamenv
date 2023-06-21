import { Role } from '@prisma/client'
import userRepository from '@/repositories/user/index'
import { ModifyMemberData } from '@/repositories/user/types/data'

type Deletable = {
  deletedAt: Date | null
}

export function getPrismaRoles(role: Role): Role[] {
  switch (role) {
    case Role.OWNER:
      return [Role.OWNER]
    case Role.MAINTAINER:
      return [Role.MAINTAINER, Role.OWNER]
    case Role.DEVELOPER:
      return [Role.DEVELOPER, Role.MAINTAINER, Role.OWNER]
    case Role.GUEST:
      return [Role.GUEST, Role.DEVELOPER, Role.MAINTAINER, Role.OWNER]
    default:
      throw new Error('Invalid role!')
  }
}

function getRolePriority(role: Role): number {
  switch (role) {
    case 'GUEST':
      return 0
    case 'DEVELOPER':
      return 1
    case 'MAINTAINER':
      return 2
    case 'OWNER':
      return 3
    default:
      return -1
  }
}

export function isDeleted(o: Deletable): boolean {
  return o.deletedAt !== null
}

export function hasAtLeastRole(userRole: Role, expectedRole: Role): boolean {
  return getRolePriority(userRole) >= getRolePriority(expectedRole)
}

export async function canModify(data: ModifyMemberData): Promise<boolean> {
  const userRole = await userRepository.read.getRole(data.userId, data.projectId)
  const memberRole = await userRepository.read.getRole(data.memberId, data.projectId)

  if (userRole.isErr || memberRole.isErr) {
    throw new Error('Failed to retrieve roles!')
  }

  const priorityDiff =
    getRolePriority(userRole.unwrap()) - getRolePriority(memberRole.unwrap())
  return priorityDiff > 0
}
