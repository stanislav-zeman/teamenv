import {Result} from "@badrap/result";
import {EnsureUserData} from "@/repositories/user/types/data";
import prisma from "@/repositories/client";

// TODO: handle changing email and username
export async function ensureUser(data: EnsureUserData): Promise<Result<boolean>> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      await prisma.user.create({data});
      return Result.ok(true);
    }

    return Result.ok(false);
  } catch (e) {
    return Result.err(e as Error);
  }
}
