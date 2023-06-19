import prisma from "../client";
import type { Project } from "@prisma/client";
import { Result } from "@badrap/result";
import { ProjectData } from "@/repositories/project/types/data";
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
        },
        orderBy: { role: "asc" }
      },
    });
    const myRole = await getRole(userId, id);
    return Result.ok({ myRole: myRole.unwrap(), ...project });
  } catch (e) {
    return Result.err(e as Error);
  }
};

const all = async (filters?: ProjectFilters): Promise<Result<Project[]>> => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        users: {
          select: { role: true },
          where: {
            userId: filters?.userId,
          },
        },
      },
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
<<<<<<< HEAD
                userId: filters?.userId
=======
                id: filters?.userId,
>>>>>>> origin/#9
              },
              {
                role: {
                  in: getPrismaRoles(filters?.atLeastRole),
                },
              },
            ],
          },
        },
      },
      orderBy: {
        name: filters?.order ?? "desc",
      },
    });
    return Result.ok(projects);
  } catch (e) {
    return Result.err(e as Error);
  }
};

const read = {
  specific,
  all,
};

export default read;
