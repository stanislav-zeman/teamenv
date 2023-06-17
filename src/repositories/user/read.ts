import {Role} from "@prisma/client";
import prisma from "@/repositories/client";
import {Result} from "@badrap/result";


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
