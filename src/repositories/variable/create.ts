import prisma from "@/repositories/client";
import type {
  Variable
} from "@prisma/client";
import {VariableCreateData} from "@/repositories/variable/types/data";
import {Result} from "@badrap/result";

async function create(data: VariableCreateData): Promise<Result<Variable>> {
  try {
    const newVariable = await prisma.variable.create({
      data: {
        ...data,
        minimalAccessRole: data.minimalAccessRole ?? "OBSERVER",
      },
    });
    return Result.ok(newVariable);
  } catch (e) {
    return Result.err(e as Error);
  }
}
