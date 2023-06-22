import {Result} from "@badrap/result";
import {Environment, User, Variable} from "@prisma/client";
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

export async function validateApiKeyUser(requestBody: any): Promise<Result<User>> {
  const validationResult = validation.apiKey.safeParse(requestBody);

  if (!validationResult.success) {
    console.log("invalid apiKey")
    return Result.err();
  }

  const apiKey = validationResult.data.apiKey;
  const user = await userRepository.read.apiKeyUser(apiKey);

  if (user.isErr) {
    return Result.err();
  }

  return Result.ok(user.value);
}

export async function validateEnvironment(requestBody: any): Promise<Result<Environment>> {
  const validationResult = validation.environmentObject.safeParse(requestBody);

  if (!validationResult.success) {
    return Result.err();
  }

  return Result.ok(validationResult.data.environment);
}
