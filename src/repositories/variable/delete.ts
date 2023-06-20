import {Result} from "@badrap/result";
import {Variable} from "@prisma/client";
import prisma from "@/repositories/client";
import {getRole} from "@/repositories/user/read";
import {VariableDeleteData} from "@/app/api/types";

async function remove(data: VariableDeleteData): Promise<Result<Variable>> {
  try {
    const deleteTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const variable = await transaction.variable.findFirstOrThrow({
          where: {
            id: data.id,
            deletedAt: null,
          },
        });

        const role = await getRole(data.userId, variable.projectId);
        if (role.isErr) {
          throw role.unwrap();
        }

        if (role.unwrap() === "GUEST") {
          throw new Error("Guests cannot delete variables");
        }

        return transaction.variable.update({
          where: {
            id: data.id,
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
