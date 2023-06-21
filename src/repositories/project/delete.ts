import prisma from "../client";
import type {
  Project
} from "@prisma/client";
import {Result} from "@badrap/result";
import userRepository from "@/repositories/user/index";
import {Role} from "@prisma/client";

async function remove(id: string, userId: string): Promise<Result<Project>> {
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

        const role = await userRepository.read.getRole(userId, id);
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
}

export default remove;
