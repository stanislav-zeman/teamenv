import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import variables from "@/repositories/variable/index"
import userRepository from "@/repositories/user/index";
import {VariableParams} from "@/app/api/types";
import {unauthorizedResponse, parseResult, internalServerErrorResponse, badRequestResponse} from "@/app/api/helpers";
import {z} from "zod";


export async function GET(request: NextRequest, context: { params: VariableParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return unauthorizedResponse();
  }

  const authorizedResult = await userRepository.read.isMember(userAuth.userId, context.params.projectId)

  if (authorizedResult.isErr) {
    return internalServerErrorResponse();
  }

  const unauthorized = !authorizedResult.unwrap()
  if (unauthorized) {
    return unauthorizedResponse();
  }

  const variableResult = await variables.read.specific(userAuth.userId, context.params.variableId);

  if (variableResult.isErr) {
    return internalServerErrorResponse();
  }

  return parseResult(variableResult, 200);
}

const putValidator = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
  hidden: z.boolean().optional(),
}).strict()

export async function PUT(request: NextRequest, context: { params: VariableParams }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const payload = await request.json();
  const validationResult = putValidator.safeParse(payload);

  if (!validationResult.success) {
    return badRequestResponse();
  }

  const data = validationResult.data;

  const variableResult = await variables.update({
    userId: user.userId,
    variableId: context.params.variableId,
    ...data,
  });

  return parseResult(variableResult, 200);
}

export async function DELETE(request: NextRequest, context: { params: VariableParams }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const variableResult = await variables.remove({id: context.params.variableId, userId: user.userId});

  return parseResult(variableResult, 202);
}
