import prisma from "../client";
import { Role, type Project } from "@prisma/client";
import { Result } from "@badrap/result";
import { getRole } from "@/repositories/user/read";

export const remove = async (
  id: string,
  userId: string
): Promise<Result<Project>> => {
  try {
    const deleteTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const project = await transaction.project.findFirstOrThrow({
          where: {
            id,
            deletedAt: null,
          },
          include: {
            users: {
              where: {
                role: Role.OWNER,
              },
            },
          },
        });

        const role = await getRole(userId, id);
        if (role.isErr) {
          throw role.unwrap();
        }

        if (role.unwrap() !== "OWNER") {
          throw new Error("Only owners can delete projects!");
        }

        return transaction.project.update({
          where: {
            id,
          },
          data: {
            deletedAt: deleteTime,
          },
        });
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
