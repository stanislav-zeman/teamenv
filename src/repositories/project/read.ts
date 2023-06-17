import prisma from "../client";
import type {
  Project
} from "@prisma/client";
import {Result} from "@badrap/result";
import {ProjectData} from "@/repositories/project/types/data";
import {isMember} from "@/repositories/user/read";

const specific = async (id: string, userId: string): Promise<Result<ProjectData>> => {
  try {
    const membership = await isMember(userId, id);
    if (membership.isErr) {
      return Result.err(new Error("failed to check user membership"));
    }

    if (!membership.unwrap()) {
      return Result.err(new Error("user is does not belong to the project"));
    }

    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        variables: true,
        users: true,
      }
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
        deletedAt: null,
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
