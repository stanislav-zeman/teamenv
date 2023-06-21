import {ModifyMemberData} from "@/repositories/user/types/data";
import {Result} from "@badrap/result";
import prisma from "../client";
import userRepository from "@/repositories/user/index";
import {Role} from "@prisma/client";

function checkRoles(userRole: Role, memberRole: Role) {
  if (userRole !== "OWNER") {
    if (userRole !== "MAINTAINER") {
      throw new Error("Insufficient role to delete project members!");
    }
    // there can only be 1 owner, therefore only "MAINTAINER" check is necessary
    if (memberRole === "MAINTAINER") {
      throw new Error("Cannot delete another maintainer!");
    }
  }
}

export async function deleteMember(data: ModifyMemberData): Promise<Result<boolean>> {
  try {
    const deletedAt = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const member = await transaction.projectUser.findFirstOrThrow({
          where: {
            deletedAt: null,
            userId: data.memberId,
          },
        });
        const userRole = await userRepository.read.getRole(data.userId, data.projectId);
        if (userRole.isErr) {
          throw new Error("Failed to retrieve logged in user role!");
        }

        checkRoles(userRole.unwrap(), member.role);

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

export default deleteMember;