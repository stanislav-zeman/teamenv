import {ModifyMemberData} from "@/repositories/user/types/data";
import {Result} from "@badrap/result";
import {ProjectUser, Role} from "@prisma/client";
import prisma from "@/repositories/client";
import {canModify} from "@/repositories/commons";


export async function changeRole(data: ModifyMemberData, newRole: Role): Promise<Result<ProjectUser>> {
  try {
    const editedAt = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const member = await transaction.projectUser.findFirstOrThrow({
          where: {
            deletedAt: null,
            userId: data.memberId,
          },
        });

        if (!await canModify(data)) {
          throw new Error("Cannot modify member with same or higher role!");
        }

        return transaction.projectUser.update({
          where: {
            id: member.id,
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
