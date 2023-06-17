import {Result} from "@badrap/result";
import {Variable} from "@prisma/client";
import prisma from "@/repositories/client";
import {isDeleted} from "@/repositories/commons";

async function remove(id: string): Promise<Result<Variable>> {
  try {
    const deleteTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const variable = await transaction.variable.findUniqueOrThrow({
          where: {
            id,
          },
        });
        // TODO: Check role for permissions
        if (isDeleted(variable)) {
          throw new Error("Variable has been deleted!");
        }
        return transaction.variable.update({
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
