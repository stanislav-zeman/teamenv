import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import variables from "@/repositories/variable/index"
import {isMember} from "@/repositories/user/read";
import {VariableParams, VariableUpdateData} from "@/app/api/types";
import {unauthorizedResponse, parseResult, internalServerErrorResponse} from "@/app/api/helpers";


export async function GET(request: NextRequest, context: { params: VariableParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return unauthorizedResponse();
  }

  const authorizedResult = await isMember(userAuth.userId, context.params.projectId)

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

export async function PUT(request: NextRequest, context: { params: VariableParams }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const data: VariableUpdateData = JSON.parse(await request.json())

  const variableResult = await variables.update({
    userId: user.userId,
    variableId: context.params.variableId,
    name: data.name,
    value: data.value,
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
