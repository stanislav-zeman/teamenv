import {Result} from "@badrap/result";
import {Variable} from "@prisma/client";
import {VariableUpdateData} from "@/repositories/variable/types/data";
import prisma from "@/repositories/client";

async function update(data: VariableUpdateData): Promise<Result<Variable>> {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const variable = await transaction.variable.findFirstOrThrow({
          where: {
            id: data.variableId,
            deletedAt: null,
          },
        });


        if (data.name === undefined && data.value === undefined) {
          throw new Error("No data provided for update!");
        }

        return transaction.variable.update({
          where: {
            id: data.variableId,
          },
          data: {
            name: data.name,
            value: data.value,
          },
        });
      })
    );

  } catch (e) {
    return Result.err(e as Error);
  }
}

export default update;
