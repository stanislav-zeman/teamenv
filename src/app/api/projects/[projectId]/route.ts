import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {badRequestResponse, parseResult, unauthorizedResponse} from "@/app/api/helpers";
import {ProjectParams} from "@/app/api/types";
import projectRepository from "@/repositories/project/index";
import {z} from "zod";

export async function GET(
  request: NextRequest,
  context: { params: ProjectParams }
): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const result = await projectRepository.read.specific(context.params.projectId, user.userId);

  return parseResult(result, 200);
}

export async function DELETE(
  request: NextRequest,
  context: { params: ProjectParams }
): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const result = await projectRepository.remove(context.params.projectId, user.userId);

  return parseResult(result, 200);
}

const putValidator = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export async function PUT(
  request: NextRequest,
  context: { params: { projectId: string } }
): Promise<Response> {
  const user = getAuth(request);
  if (!user.userId) {
    return unauthorizedResponse();
  }

  const payload = await request.json();
  const validationResult = putValidator.safeParse(payload);

  if (!validationResult.success) {
    return badRequestResponse();
  }

  const data = validationResult.data
  const result = await projectRepository.update({
    id: context.params.projectId,
    userId: user.userId,
    ...data,
  });

  return parseResult(result, 201);
}
