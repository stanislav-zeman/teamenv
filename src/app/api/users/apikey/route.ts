import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {parseResult, unauthorizedResponse} from "@/app/api/helpers";
import userRepository from "@/repositories/user/index";

export async function GET(request: NextRequest): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const result = await userRepository.read.apiKey(user.userId);

  return parseResult(result, 200);
}

export async function POST(request: NextRequest): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const result = await userRepository.update.resetAPIKey(user.userId);

  return parseResult(result, 200);
}