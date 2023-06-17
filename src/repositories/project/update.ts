import prisma from "../client";
import type {
    Project
} from "@prisma/client";
import {Result} from "@badrap/result";
import {ProjectUpdateData} from "@/repositories/project/types/data";
import {isDeleted} from "@/repositories/commons";

const update = async (data: ProjectUpdateData): Promise<Result<Project>> => {
  try {
    const updateTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction)  => {
        const project = await transaction.project.findUniqueOrThrow({
          where: {
            id: data.id,
          },
        });
        if (isDeleted(project)) {
          throw new Error("Project has been deleted!");
        }
        if (data.name === undefined && data.description === undefined) {
          throw new Error("No data provided for update!");
        }

        return transaction.project.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
            description: data.description,
            editedAt: updateTime,
          },
        });
      })
    );
  } catch (e) {
      return Result.err(e as Error);
  }
}
