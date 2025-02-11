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

        const projectUser = await transaction.projectUser.findFirstOrThrow({
          where: {
            userId: data.userId,
            projectId: variable.projectId,
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
            environment: data.environment,
            hiddenVariable: {
              updateMany: {
                where: {
                  projectUserId: projectUser.id,
                },
                data: {
                  hidden: data.hidden,
                },
              },
            },
          },
        });
      })
    );

  } catch (e) {
    return Result.err(e as Error);
  }
}

export default update;
