import { NextRequest } from "next/server";
import projects from "@/repositories/project";
import { getAuth } from "@clerk/nextjs/server";
import { ReadonlyURLSearchParams } from "next/navigation";
import { parseResult, unauthorizedResponse } from "@/app/api/helpers";
import { parseFiltersFromParams } from "@/models/Filters";
import { ProjectCreateData } from "@/app/api/types";


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

export async function POST(request: NextRequest): Promise<Response> {
  const user = getAuth(request);
  if (!user.userId) {
    return unauthorizedResponse();
  }

  const data: ProjectCreateData = await request.json();
  const result = await projects.create({ userId: user.userId, ...data });
  return parseResult(result, 201);
}
