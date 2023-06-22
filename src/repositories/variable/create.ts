import prisma from "@/repositories/client";
import type {
  Variable
} from "@prisma/client";
import {VariableCreateData} from "@/repositories/variable/types/data";
import {Result} from "@badrap/result";

async function create(data: VariableCreateData): Promise<Result<Variable>> {
  try {
    const projectUser = await prisma.projectUser.findFirstOrThrow({
      where: {
        projectId: data.projectId,
        userId: data.userId,
      },
    });

    const newVariable = await prisma.variable.create({
      data: {
        projectId: data.projectId,
        name: data.name,
        value: data.value,
        environment: data.environment,
        hiddenVariable: {
          create: {
            projectUserId: projectUser.id,
            hidden: false,
          },
        },
      },
    });
    return Result.ok(newVariable);
  } catch (e) {
    return Result.err(e as Error);
  }
}

export default create;
