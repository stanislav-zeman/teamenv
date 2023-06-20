import prisma from "../client";
import {Prisma, Role} from "@prisma/client";
import { Result } from "@badrap/result";
import {Pageable, ProjectData, ProjectSummary} from "@/repositories/project/types/data";
import userRepository from "@/repositories/user/index";
import { ProjectFilters } from "@/models/Filters";
import { getPrismaRoles } from "@/repositories/commons";

async function specific(id: string, userId: string): Promise<Result<ProjectData>> {
  try {
    const membership = await userRepository.read.isMember(userId, id);
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
          include: {
            hiddenVariable: {
              select: {
                hidden: true,
              },
            },
          },
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
    const myRole = await userRepository.read.getRole(userId, id);
    return Result.ok({ myRole: myRole.unwrap(), ...project });
  } catch (e) {
    return Result.err(e as Error);
  }
}

const pageSize = 9;

async function all(filters: ProjectFilters): Promise<Result<Pageable<ProjectSummary>>> {
  try {
    const skip = filters.page - 1;
    const whereFilter: Prisma.ProjectWhereInput = {
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
    }

    const count = await prisma.project.count({
      where: whereFilter,
    });

    const projects = await prisma.project.findMany({
      skip,
      take: pageSize,
      where: whereFilter,
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


    let pageCount = Math.round(count / pageSize);
    if (count % pageSize === 0) {
      pageCount += 1;
    }

    const mapped: ProjectSummary[] = projects.map(({ users, ...project }) => ({
      ...project,
      owner: users[0],
      myRole: users.find(({ userId }) => userId == filters?.userId)?.role,
    }));


    return Result.ok({
      docs: mapped,
      page: filters.page,
      pages: pageCount,
      limit: pageSize,
      total: count,
    });
  } catch (e) {
    return Result.err(e as Error);
  }
}

const read = {
  specific,
  all,
};

export default read;
