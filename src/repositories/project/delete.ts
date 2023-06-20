import prisma from "../client";
import { Role, type Project } from "@prisma/client";
import { Result } from "@badrap/result";
import { isDeleted } from "@/repositories/commons";

const deleteProject = async (
  id: string,
  userId: string
): Promise<Result<Project>> => {
  try {
    const deleteTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const project = await transaction.project.findUniqueOrThrow({
          where: {
            id,
          },
          include: {
            users: {
              where: {
                role: Role.OWNER,
              },
            },
          },
        });
        if (project.users[0].userId !== userId) {
          throw new Error("User is not owner of project!");
        }
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
};

export default deleteProject;
