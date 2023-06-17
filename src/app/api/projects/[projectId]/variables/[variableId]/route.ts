import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {Variable} from "@/models/Variable";
import variables from "@/repositories/variable/index"
import {isMember} from "@/repositories/user/read";

type Params = {
  projectId: string;
  variableId: string;
};

// TODO: Implement helper functions for common behavior
export async function GET(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return new Response(null, { status: 401 });
  }

  const authorizedResult = await isMember(user.userId, context.params.projectId)

  if (authorizedResult.isErr) {
    return new Response(null, { status: 500 });
  }

  const unauthorized = !authorizedResult.unwrap()
  if (unauthorized) {
    return new Response(null, { status: 401 });
  }

  const variableResult = await variables.read.specific(user.userId, context.params.variableId);

  if (variableResult.isErr) {
    return new Response(null, { status: 500 });
  }

  const variable = variableResult.unwrap()
  return new Response(JSON.stringify(variable), { status: 200 });
}

export async function PUT(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return new Response(null, { status: 401 });
  }

  // TODO: Swap for prisma model
  const variable: Variable = JSON.parse(await request.json())

  const result = await variables.update({
    userId: user.userId,
    variableId: variable.id,
    editor: user.userId,
    name: variable.name,
    value: variable.value,
    minimalAccessRole: undefined,
  });

  if (result.isErr) {
    return new Response(null, { status: 500 });
  }

  return new Response(JSON.stringify(result.unwrap()), { status: 204 });
}

export async function DELETE(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return new Response(null, { status: 401 });
  }

  const authorizedResult = await isMember(user.userId, context.params.projectId)

  if (authorizedResult.isErr) {
    return new Response(null, { status: 500 });
  }

  const unauthorized = !authorizedResult.unwrap()
  if (unauthorized) {
    return new Response(null, { status: 401 });
  }

  const variableResult = await variables.remove(context.params.variableId);

  if (variableResult.isErr) {
    return new Response(null, { status: 500 });
  }

  const variable = variableResult.unwrap()
  return new Response(JSON.stringify(variable), { status: 202 });
}
