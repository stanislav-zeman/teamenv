import { Role } from '@prisma/client'

export type ProjectMemberData = {
  memberId: string
  role: 'GUEST' | 'DEVELOPER' | 'MAINTAINER' | 'OWNER'
}

export type ProjectMemberUpdateData = {
  role: Role
}

export type ProjectCreateData = {
  name: string
  description: string
}

export type VariableCreateData = {
  name: string
  value: string
}

export type VariableUpdateData = {
  name: string
  value: string
  hidden: boolean
}

export type VariableDeleteData = {
  id: string
  userId: string
}

export type ProjectParams = {
  projectId: string
}

export type MemberParams = {
  projectId: string
  memberId: string
}

export type VariableParams = {
  projectId: string
  variableId: string
}
