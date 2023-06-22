import {Result} from "@badrap/result";
import {User, Variable} from "@prisma/client";
import validation from "@/app/api/validation";
import userRepository from "@/repositories/user";
import {NextRequest} from "next/server";

export type Params = {
  projectId: string;
};

export function badRequestResponse(): Response {
  return new Response(null, { status: 400 });
}

export function unauthorizedResponse(): Response {
  return new Response(null, { status: 401 });
}

export function internalServerErrorResponse(): Response {
  return new Response(null, { status: 500 });
}

export function parseResult<T>(result: Result<T>, successStatus: number): Response {
  let status = result.isErr ? 500 : successStatus;
  return new Response(JSON.stringify(result.unwrap()), { status });
}

export function exportVariables(variables: Variable[]): string {
  return variables.map(variable => `${variable.name}=${variable.value}`).join("\n");
}

export async function validateApiKeyUser(request: NextRequest): Promise<Result<User>> {
  const payload = await request.json();
  const validationResult = validation.apiKey.safeParse(payload);

  if (!validationResult.success) {
    return Result.err();
  }
  
  const apiKey = validationResult.data.apiKey;
  const user = await userRepository.read.apiKeyUser(apiKey);
  
  if (user.isErr) {
    return Result.err();
  }
  
  return Result.ok(user.value);
}
