import { NextRequest } from "next/server";
import {
  unauthorizedResponse,
  parseResult,
  badRequestResponse,
} from "@/app/api/helpers";
import { getAuth } from "@clerk/nextjs/server";
import { ProjectParams } from "@/app/api/types";
import userRepository from "@/repositories/user/index";
import { z } from "zod";
import validation from "@/app/api/validation";
import projectRepository from "@/repositories/project/index";
import { ReadonlyURLSearchParams } from "next/navigation";
import { parseFiltersFromParams } from "@/models/Filters";

const postValidator = z
  .object({
    memberId: z.string(),
    role: validation.role,
  })
  .strict();

export async function POST(
  request: NextRequest,
  context: { params: ProjectParams }
): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return unauthorizedResponse();
  }

  const payload = await request.json();
  const validationResult = postValidator.safeParse(payload);

  if (!validationResult.success) {
    return badRequestResponse();
  }

  const data = validationResult.data;
  const result = await userRepository.create.createProjectMember({
    userId: userAuth.userId,
    projectId: context.params.projectId,
    ...data,
  });

  return parseResult(result, 201);
}

export async function GET(
  request: NextRequest,
  context: { params: ProjectParams }
): Promise<Response> {
  const user = getAuth(request);
  if (!user.userId) {
    return unauthorizedResponse();
  }

  const searchParams = request.nextUrl.searchParams;
  const readonlySearchParams = new ReadonlyURLSearchParams(searchParams);
  const filters = {
    userId: user.userId,
    ...parseFiltersFromParams(readonlySearchParams),
  };

  const result = await projectRepository.read.projectMembers(
    context.params.projectId,
    filters
  );

  return parseResult(result, 201);
}
