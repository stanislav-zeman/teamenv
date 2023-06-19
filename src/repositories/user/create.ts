import { Result } from '@badrap/result'
import {
  CreateProjectMemberData,
  EnsureUserData,
} from '@/repositories/user/types/data'
import prisma from '@/repositories/client'
import { ProjectUser } from '@prisma/client'
import { getRole } from '@/repositories/user/read'
import { hasAtLeastRole } from '@/repositories/commons'

// TODO: handle changing email and username
export async function ensureUser(
  data: EnsureUserData
): Promise<Result<boolean>> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: data.id,
      },
    })

    if (!user) {
      await prisma.user.create({ data })
      return Result.ok(true)
    }

    return Result.ok(false)
  } catch (e) {
    return Result.err(e as Error)
  }
}

export async function createProjectMember(
  data: CreateProjectMemberData
): Promise<Result<ProjectUser>> {
  try {
    const userRole = await getRole(data.userId, data.projectId)
    if (userRole.isErr) {
      return Result.err(new Error('Failed to retrieve logged in user role!'))
    }

    if (userRole.unwrap() !== 'OWNER') {
      if (!hasAtLeastRole(userRole.unwrap(), 'MAINTAINER')) {
        return Result.err(
          new Error('Only maintainers and above can invite users to project!')
        )
      }
      if (data.role === 'MAINTAINER') {
        return Result.err(
          new Error('Only owners can invite users with maintainer role!')
        )
      }
    }

    if (data.role === 'OWNER') {
      return Result.err(new Error('There can only be one owner role!'))
    }

    const newProjectUser = await prisma.projectUser.create({
      data: {
        userId: data.memberId,
        projectId: data.projectId,
        role: data.role,
      },
    })
    return Result.ok(newProjectUser)
  } catch (e) {
    console.log(e)
    return Result.err(e as Error)
  }
}
