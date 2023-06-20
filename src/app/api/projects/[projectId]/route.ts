import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import read from "@/repositories/project/read";
import { parseResult, unauthorizedResponse } from "@/app/api/helpers";
import { ProjectParams } from "@/app/api/types";
import { remove } from "@/repositories/project/delete";
import { ProjectCreateData } from "@/repositories/project/types/data";
import { update } from "@/repositories/project/update";

export async function GET(
  request: NextRequest,
  context: { params: ProjectParams }
): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const result = await read.specific(context.params.projectId, user.userId);

  return parseResult(result, 200);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { projectId: string } }
): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const result = await remove(context.params.projectId, user.userId);

  return parseResult(result, 200);
}

export async function PUT(
  request: NextRequest,
  context: { params: { projectId: string } }
): Promise<Response> {
  const user = getAuth(request);
  if (!user.userId) {
    return unauthorizedResponse();
  }

  const data: ProjectCreateData = await request.json();
  const result = await update({
    ...data,
    userId: user.userId,
    id: context.params.projectId,
  });
  return parseResult(result, 201);
}
