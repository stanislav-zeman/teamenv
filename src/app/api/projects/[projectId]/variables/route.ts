import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import variableRepository from "@/repositories/variable/index";
import {unauthorizedResponse, Params, parseResult, badRequestResponse} from "@/app/api/helpers";
import {z} from "zod";
import {EnvironmentParams, ProjectParams} from "@/app/api/types";
import {ReadonlyURLSearchParams} from "next/navigation";
import {parseFiltersFromParams} from "@/models/Filters";
import validation from "@/app/api/validation";

const postValidator = z.object({
  name: z.string(),
  value: z.string(),
  environment: validation.environment
}).strict()

export async function POST(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const payload = await request.json();
  const validationResult = postValidator.safeParse(payload);

  if (!validationResult.success) {
    return badRequestResponse();
  }

  const data = validationResult.data

  const result = await variableRepository.create({
    userId: user.userId,
    projectId: context.params.projectId,
    ...data
  });

  return parseResult(result, 201);
}

export async function GET(
  request: NextRequest,
  context: { params: ProjectParams }
): Promise<Response> {
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

  const result = await variableRepository.read.all({
    projectId: context.params.projectId,
      ...filters,
    }
  );

  return parseResult(result, 201);
}
