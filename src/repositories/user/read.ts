import { Role, User } from "@prisma/client";
import prisma from "@/repositories/client";
import { Result } from "@badrap/result";
import { IFilter } from "@/models/Filters";
import {APIKey} from "@/repositories/user/types/data";

async function specific(id: string): Promise<Result<User>> {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
        deletedAt: null,
      },
    });

    return Result.ok(user);
  } catch (e) {
    return Result.err(e as Error);
  }
}

async function all(filters: IFilter): Promise<Result<User[]>> {
  try {
    const users = await prisma.user.findMany({
      take: 5,
      where: {
        deletedAt: null,
        projects: {
          none: {
            deletedAt: null,
            project: {
              id: filters.ignoreProject ?? "",
            },
          },
        },
        OR: [
          {
            username: {
              contains: filters.search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: filters.search,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return Result.ok(users);
  } catch (e) {
    console.log(e);
    return Result.err(e as Error);
  }
}

async function getRole(
  userId: string,
  projectId: string
): Promise<Result<Role>> {
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

async function isMember(
  userId: string,
  projectId: string
): Promise<Result<boolean>> {
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

async function apiKey(
  userId: string,
): Promise<Result<APIKey>> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return Result.err(new Error("No such user!"))
    }

    return Result.ok(user.APIKey);
  } catch (e) {
    return Result.err(e as Error);
  }
}

async function apiKeyUser(
  apiKey: APIKey,
): Promise<Result<User>> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        APIKey: apiKey,
      },
    });

    if (!user) {
      return Result.err(new Error("No such user!"))
    }

    return Result.ok(user);
  } catch (e) {
    return Result.err(e as Error);
  }
}

const read = {
  specific,
  all,
  isMember,
  getRole,
  apiKey,
  apiKeyUser,
};

export default read;
