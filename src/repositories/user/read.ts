import {Role, User} from "@prisma/client";
import prisma from "@/repositories/client";
import {Result} from "@badrap/result";


export async function getAll(search?: string): Promise<Result<User[]>> {
  try {
    const users = await prisma.user.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            username: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return Result.ok(users);
  } catch (e) {
    return Result.err(e as Error);
  }
}

export async function getRole(userId: string, projectId: string): Promise<Result<Role>> {
  try {
    const member = await prisma.projectUser.findFirstOrThrow({
      where: {
        userId,
        projectId,
      },
    });
    return Result.ok(member.role);
  } catch (e) {
    return Result.err(e as Error);
  }
}

export async function isMember(userId: string, projectId: string): Promise<Result<boolean>> {
  try {
    const member = await prisma.projectUser.findFirst({
      where: {
        userId,
        projectId,
      },
    });

    return Result.ok(member !== null);
  } catch (e) {
    return Result.err(e as Error);
  }
}
