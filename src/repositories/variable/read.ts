import {Result} from "@badrap/result";
import {Variable} from "@prisma/client";
import prisma from "@/repositories/client";
import {VariableInfoData} from "@/repositories/variable/types/data";


async function specific(userId: string, variableId: string): Promise<Result<VariableInfoData>> {
  try {
    const variable = await prisma.variable.findFirstOrThrow({
      where: {
        id: variableId,
        deletedAt: null,
      },
      include: {
        hiddenVariable: {
          where: {
            projectUserId: userId,
          },
          select: {
            hidden: true,
          },
        },
      },
    });

    return Result.ok(variable);
  } catch (e) {
    return Result.err(e as Error);
  }
}

async function all(): Promise<Result<Variable[]>> {
  try {
    const variables = await prisma.variable.findMany({
      where: {
        deletedAt: null,
      },
    });
    return Result.ok(variables);
  } catch (e) {
    return Result.err(e as Error);
  }
}

const read = {
  specific,
  all,
};

export default read;
