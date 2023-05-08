import prisma from "../client";
import type {
  Project
} from "@prisma/client";
import {ProjectCreateData} from "@/repositories/project/types/data";
import {AsyncResult} from "@/repositories/types";
import {Result} from "@badrap/result";

const create = async (data: ProjectCreateData): AsyncResult<Project> => {
  try {
    const newProject = await prisma.project.create({data});
    return Result.ok(newProject);
  } catch (e) {
    return Result.err(e as Error);
  }
};
