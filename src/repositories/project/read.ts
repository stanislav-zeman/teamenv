import prisma from '../client'
import type { Project } from '@prisma/client'
import { Result } from '@badrap/result'
import { ProjectData } from '@/repositories/project/types/data'
import { isMember } from '@/repositories/user/read'
import { ProjectFilters } from '@/models/Filters'
import { getPrismaRoles } from '@/repositories/commons'
import { Role } from '@/models/Role'

const specific = async (
  id: string,
  userId: string
): Promise<Result<ProjectData>> => {
  try {
    const membership = await isMember(userId, id)
    if (membership.isErr) {
      return Result.err(new Error('Failed to check user membership!'))
    }

    if (!membership.unwrap()) {
      return Result.err(new Error('User does not belong to the project!'))
    }

    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        variables: true,
        users: true,
      },
    })
    return Result.ok(project)
  } catch (e) {
    return Result.err(e as Error)
  }
}

const all = async (filters?: ProjectFilters): Promise<Result<Project[]>> => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        deletedAt: null,
        name: {
          contains: filters?.search ?? '',
          mode: 'insensitive',
        },
        users: {
          some: {
            AND: [
              {
                userId: filters?.userId,
              },
              {
                role: {
                  in: getPrismaRoles(filters?.atLeastRole ?? Role.GUEST),
                },
              },
            ],
          },
        },
      },
      include: {
        users: {
          where: {
            role: Role.OWNER,
          },
        },
      },
      orderBy: {
        name: filters?.order ?? 'desc',
      },
    })

    const mapped = projects.map((project) => ({
      ...project,
      owner: project.users[0],
    }))
    return Result.ok(mapped)
  } catch (e) {
    return Result.err(e as Error)
  }
}

const read = {
  specific,
  all,
}

export default read
