import {Result} from "@badrap/result";
import {Variable} from "@prisma/client";
import prisma from "@/repositories/client";


async function specific(id: string): Promise<Result<Variable>> {
  try {
    // TODO: Check permissions
    const variable = await prisma.variable.findUniqueOrThrow({
      where: {
        id: id,
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
