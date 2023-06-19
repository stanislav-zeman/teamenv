import { Role, User } from '@prisma/client'
import prisma from '@/repositories/client'
import { Result } from '@badrap/result'
import { IFilter } from '@/models/Filters'

export async function getAll(filters?: IFilter): Promise<Result<User[]>> {
  try {
    const users = await prisma.user.findMany({
      take: 5,
      where: {
        deletedAt: null,
        OR: [
          {
            username: {
              contains: filters?.search ?? '',
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: filters?.search ?? '',
              mode: 'insensitive',
            },
          },
        ],
      },
    })
    return Result.ok(users)
  } catch (e) {
    console.log(e)
    return Result.err(e as Error)
  }
}

export async function getRole(
  userId: string,
  projectId: string
): Promise<Result<Role>> {
  try {
    const member = await prisma.projectUser.findFirstOrThrow({
      where: {
        userId,
        projectId,
      },
    })
    return Result.ok(member.role)
  } catch (e) {
    return Result.err(e as Error)
  }
}

export async function isMember(
  userId: string,
  projectId: string
): Promise<Result<boolean>> {
  try {
    const member = await prisma.projectUser.findFirst({
      where: {
        userId,
        projectId,
      },
    })

    return Result.ok(member !== null)
  } catch (e) {
    return Result.err(e as Error)
  }
}
