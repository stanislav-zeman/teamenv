import { Role } from '@/models/Role'

// Used for backwards compatibility
export const getRoleFromIndex = (index: number) => {
  switch (index) {
    case 0:
      return Role.DEVELOPER
    case 1:
      return Role.GUEST
    case 2:
      return Role.MAINTAINER
    default:
      return Role.OWNER
  }
}

export const roleToIndex = (role: Role) => {
  switch (role) {
    case Role.GUEST:
      return 0
    case Role.DEVELOPER:
      return 1
    case Role.MAINTAINER:
      return 2
    default:
      return 3
  }
}
