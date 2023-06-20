import prisma from "../client";
import { Role } from "@prisma/client";
import { Result } from "@badrap/result";
<<<<<<< HEAD
import {
  OwnerInfo,
  ProjectData,
  ProjectSummary,
} from "@/repositories/project/types/data";
=======
import {  ProjectData, ProjectSummary } from "@/repositories/project/types/data";
>>>>>>> 65d7a8c75a3fb178c5cd7b047d6ce394bb5c1f05
import { getRole, isMember } from "@/repositories/user/read";
import { ProjectFilters } from "@/models/Filters";
import { getPrismaRoles } from "@/repositories/commons";

const specific = async (
  id: string,
  userId: string
): Promise<Result<ProjectData>> => {
  try {
    const membership = await isMember(userId, id);
    if (membership.isErr) {
      return Result.err(new Error("Failed to check user membership!"));
    }

    if (!membership.unwrap()) {
      return Result.err(new Error("User does not belong to the project!"));
    }

    const project = await prisma.project.findFirstOrThrow({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        variables: {
          where: {
            deletedAt: null,
          },
<<<<<<< HEAD
=======
          include: {
            hiddenVariable: {
              select: {
                hidden: true,
              },
            },
          },
>>>>>>> 65d7a8c75a3fb178c5cd7b047d6ce394bb5c1f05
        },
        users: {
          select: {
            id: true,
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
          where: { deletedAt: null },
          orderBy: { role: "asc" },
        },
      },
    });
    const myRole = await getRole(userId, id);
    return Result.ok({ myRole: myRole.unwrap(), ...project });
  } catch (e) {
    return Result.err(e as Error);
  }
};

const pageSize = 9;

const all = async (filters?: ProjectFilters): Promise<Result<ProjectSummary[]>> => {
  try {
    const projects = await prisma.project.findMany({
      skip: pageSize * (filters?.page ?? 0),
      take: pageSize,
      where: {
        deletedAt: null,
        name: {
          contains: filters?.search ?? "",
          mode: "insensitive",
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
          include: {
            user: {
              select: {
                username: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: {
            role: "asc",
          },
        },
      },
      orderBy: {
        name: filters?.order ?? "desc",
      },
    });

    const mapped: ProjectSummary[] = projects.map(({ users, ...project }) => ({
      ...project,
      owner: users[0],
      myRole: users.find(({ userId }) => userId == filters?.userId)?.role,
    }));
    return Result.ok(mapped);
  } catch (e) {
    return Result.err(e as Error);
  }
};

const read = {
  specific,
  all,
};

export default read;
