import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {unauthorizedResponse, parseResult, badRequestResponse} from "@/app/api/helpers";
import {ModifyMemberData} from "@/repositories/user/types/data";
import userRepository from "@/repositories/user/index";
import {MemberParams} from "@/app/api/types";
import { z } from 'zod'
import validation from "@/app/api/validation";

const putValidator = z.object({
  role: validation.role,
}).strict()

export async function PUT(request: NextRequest, context: { params: MemberParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return unauthorizedResponse();
  }

  const payload = await request.json();
  const validationResult = putValidator.safeParse(payload);

  if (!validationResult.success) {
    return badRequestResponse();
  }

  const modifyMemberData: ModifyMemberData = {
    userId: userAuth.userId,
    projectId: context.params.projectId,
    memberId: context.params.memberId,
  };

  const data = validationResult.data
  const result =  await userRepository.update.specific(modifyMemberData, data.role);
  return parseResult(result, 200);
}

export async function DELETE(request: NextRequest, context: { params: MemberParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return unauthorizedResponse();
  }

  const result = await userRepository.remove({
    userId: userAuth.userId,
    projectId: context.params.projectId,
    memberId: context.params.memberId
  });

  return parseResult(result, 200);
}
