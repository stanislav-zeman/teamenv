import prisma from "../client";
import type {
  Project
} from "@prisma/client";
import {Result} from "@badrap/result";

const deleteProject = async (id: string): Promise<Result<Project>> => {
  try {
    const deleteTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const project = await transaction.project.findUniqueOrThrow({
          where: {
            id,
          },
        });
        if (isDeleted(project)) {
          throw new Error("Project has been deleted!");
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
