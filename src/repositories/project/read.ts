import prisma from "../client";
import type {
  Project
} from "@prisma/client";
import {Result} from "@badrap/result";

const specific = async (id: string): Promise<Result<Project>> => {
  try {
    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return Result.ok(project);
  } catch (e) {
    return Result.err(e as Error);
  }
};

const all = async (name?: string): Promise<Result<Project[]>> => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    return Result.ok(projects);
  } catch (e) {
    return Result.err(e as Error);
  }
};

const read = {
  specific,
  all,
};

export default read;
