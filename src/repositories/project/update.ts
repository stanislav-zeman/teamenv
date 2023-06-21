import prisma from "../client";
import type {
    Project
} from "@prisma/client";
import {Result} from "@badrap/result";
import {ProjectUpdateData} from "@/repositories/project/types/data";
import userRepository from "@/repositories/user/index";

async function update(data: ProjectUpdateData): Promise<Result<Project>> {
  try {
    const updateTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction)  => {
        const project = await transaction.project.findFirstOrThrow({
          where: {
            id: data.id,
            deletedAt: null,
          },
        });

        if (data.name === undefined && data.description === undefined) {
          throw new Error("No data provided for update!");
        }

        const role = await userRepository.read.getRole(data.userId, data.id)
        if (role.isErr) {
          throw role.unwrap();
        }

        if (role.unwrap() !== "OWNER") {
          throw new Error("Only owners can update projects!");
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

export default update;
