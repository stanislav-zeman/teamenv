import {Result} from "@badrap/result";
import {Variable} from "@prisma/client";
import prisma from "@/repositories/client";
import {VariableInfoData} from "@/repositories/variable/types/data";
import {VariableFilters} from "@/models/Filters";

async function specific(
  userId: string,
  variableId: string
): Promise<Result<VariableInfoData>> {
  try {
    const projectUser = await prisma.projectUser.findFirstOrThrow({
      where: {
        userId: userId,
        deletedAt: null,
      },
    });

    const variable = await prisma.variable.findFirstOrThrow({
      where: {
        id: variableId,
        deletedAt: null,
      },
      include: {
        hiddenVariable: {
          where: {
            projectUserId: projectUser.id,
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

async function all(filters: VariableFilters): Promise<Result<Variable[]>> {
  try {
    const projectUser = await prisma.projectUser.findFirstOrThrow({
      where: {
        userId: filters.userId,
        projectId: filters.projectId,
        deletedAt: null,
      },
    });

    const variables = await prisma.variable.findMany({
      where: {
        projectId: filters.projectId,
        deletedAt: null,
        environment: filters.environment,
        name: {
          contains: filters?.search ?? "",
          mode: "insensitive",
        },
        hiddenVariable: {
          some: {
            projectUserId: projectUser.id,
            hidden: filters.display === "all" ? undefined : false,
          },
        },
      },
      orderBy: {
        name: filters.order,
      },
      include: {
        hiddenVariable: {
          select: {
            hidden: true,
          },
        },
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
