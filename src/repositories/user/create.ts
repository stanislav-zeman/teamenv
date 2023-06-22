import {Result} from '@badrap/result'
import {CreateProjectMemberData, EnsureUserData,} from '@/repositories/user/types/data'
import prisma from '@/repositories/client'
import {ProjectUser} from '@prisma/client'
import userRepository from '@/repositories/user/index'
import {hasAtLeastRole} from '@/repositories/commons'
import generateApiKey from 'generate-api-key'


async function ensureUser(data: EnsureUserData): Promise<Result<boolean>> {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findFirst({
          where: {
            id: data.id,
          },
        });

        if (!user) {
          await transaction.user.create({
            data: {
              ...data,
              APIKey: generateApiKey().toString(),
            }
          });
          return true;
        }

        if (data.username !== user.username || data.email !== user.email || data.avatarUrl !== user.avatarUrl) {
          await transaction.user.update({
            where: {
              id: data.id,
            },
            data: {
              ...data,
            },
          });
          return true;
        }

        return false;
      })
    );
  } catch (e) {
    return Result.err(e as Error)
  }
}

async function createProjectMember(
  data: CreateProjectMemberData
): Promise<Result<ProjectUser>> {
  try {
    const userRole = await userRepository.read.getRole(data.userId, data.projectId)
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
    return Result.err(e as Error)
  }
}

const create = {
  ensureUser,
  createProjectMember,
};

export default create;