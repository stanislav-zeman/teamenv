import {Result} from "@badrap/result";
import {Variable} from "@prisma/client";
import {VariableUpdateData} from "@/repositories/variable/types/data";
import prisma from "@/repositories/client";


async function update(data: VariableUpdateData): Promise<Result<Variable>> {
  try {
    // not needed until variable edits are implemented
    // const updateTime = new Date();
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        // TODO: Check permissions
        const variable = await transaction.variable.findUniqueOrThrow({
          where: {
            id: data.id,
          },
        });
        if (isDeleted(variable)) {
          throw new Error("Variable has been deleted!");
        }

        if (data.name === undefined && data.value === undefined && data.minimalAccessRole === undefined) {
          throw new Error("No data provided for update!");
        }

        return transaction.variable.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
            value: data.value,
            minimalAccessRole: data.minimalAccessRole,
          },
        });
      })
    );

  } catch (e) {
    return Result.err(e as Error);
  }
}
