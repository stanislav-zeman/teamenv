import {APIKey, ModifyMemberData} from "@/repositories/user/types/data";
import {Result} from "@badrap/result";
import {ProjectUser, Role} from "@prisma/client";
import prisma from "@/repositories/client";
import generateApiKey from 'generate-api-key';


async function specific(data: ModifyMemberData, newRole: Role): Promise<Result<ProjectUser>> {
  try {
    const editedAt = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const member = await transaction.projectUser.findFirstOrThrow({
          where: {
            deletedAt: null,
            id: data.memberId,
          },
        });
        const user = await transaction.projectUser.findFirstOrThrow({
          where: {
            deletedAt: null,
            userId: data.userId,
            projectId: data.projectId
          },
        });

        if (user.role !== "OWNER") {
          if (user.role !== "MAINTAINER") {
            throw new Error("Only maintainers and above can change roles!");
          }
          if (member.role === "MAINTAINER") {
            throw new Error("Maintainers cannot change roles of other maintainers!");
          }
          if (newRole === "MAINTAINER") {
            throw new Error("Maintainers cannot assign other maintainers!");
          }
        }

        if (newRole === "OWNER") {
          throw new Error("There can only be one owner role!");
        }

        return transaction.projectUser.update({
          where: {
            id: member.id
          },
          data: {
            role: newRole,
            editedAt: editedAt,
          },
        });
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
}

async function resetAPIKey(userId: string): Promise<Result<APIKey>> {
  try {
    const newKey = generateApiKey().toString();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        APIKey: newKey,
      },
    });

    return Result.ok(newKey)
  } catch (e) {
    return Result.err(e as Error)
  }
}

const update = {
  specific,
  resetAPIKey,
};

export default update;