import { NextRequest } from "next/server";
import projects from "@/repositories/project";
import { getAuth } from "@clerk/nextjs/server";
import { ReadonlyURLSearchParams } from "next/navigation";
import {
  badRequestResponse,
  parseResult,
  unauthorizedResponse,
} from "@/app/api/helpers";
import { parseFiltersFromParams } from "@/models/Filters";
import { z } from "zod";

export async function GET(request: NextRequest): Promise<Response> {
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

  const result = await projects.read.all(filters);

  return parseResult(result, 200);
}

const postValidator = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .strict();

export async function POST(request: NextRequest): Promise<Response> {
  const user = getAuth(request);
  if (!user.userId) {
    return unauthorizedResponse();
  }

  const payload = await request.json();
  const validationResult = postValidator.safeParse(payload);

  if (!validationResult.success) {
    return badRequestResponse();
  }

  const data = validationResult.data;
  const result = await projects.create({
    userId: user.userId,
    ...data,
  });

  return parseResult(result, 201);
}
