import {ModifyMemberData} from "@/repositories/user/types/data";
import {Result} from "@badrap/result";
import prisma from "../client";
import {canModify, hasAtLeastRole} from "@/repositories/commons";

export async function deleteMember(data: ModifyMemberData): Promise<Result<boolean>> {
  try {
    const deletedAt = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const member = await transaction.projectUser.findFirstOrThrow({
          where: {
            deletedAt: null,
            userId: data.userId,
          },
        });

        if (!await hasAtLeastRole(data.userId, data.projectId, "MAINTAINER")) {
          throw new Error("Insufficient role to delete project members!");
        }

        if (!await canModify(data)) {
          throw new Error("Cannot delete member with same or higher role!");
        }

        await transaction.projectUser.update({
          where: {
            id: member.id,
          },
          data: {
            deletedAt,
          },
        })

        return true;
      }
    ));
  } catch (e) {
    return Result.err(e as Error);
  }
}
