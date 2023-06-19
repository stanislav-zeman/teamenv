import prisma from "../client";
import { Role, type Project } from "@prisma/client";
import { Result } from "@badrap/result";
import { OwnerInfo, ProjectData, ProjectSummary } from "@/repositories/project/types/data";
import { getRole, isMember } from "@/repositories/user/read";
import { ProjectFilters } from "@/models/Filters";
import { getPrismaRoles } from "@/repositories/commons";


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

    const project = await prisma.project.findFirstOrThrow({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        variables: true,
        users: {
          select: {
            role: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
                avatarUrl: true,
                createdAt: true,
              },
            },
          },
          orderBy: { role: "asc" }
        },
      },
    });
    const myRole = await getRole(userId, id);
    return Result.ok({ myRole: myRole.unwrap(), ...project });
  } catch (e) {
    return Result.err(e as Error)
  }
}

const all = async (filters?: ProjectFilters): Promise<Result<ProjectSummary[]>> => {
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
          include: {user: {
            select: {
              username: true,
              avatarUrl: true
            }
          }},
          orderBy: {
            role: "asc"
          }
        },
      },
      orderBy: {
        name: filters?.order ?? 'desc',
      },
    })

    const mapped: ProjectSummary[] = projects.map(({users, ...project}) => ({
      ...project,
      owner: users[0],
      myRole: users.find(({userId}) => userId == filters?.userId)?.role
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
