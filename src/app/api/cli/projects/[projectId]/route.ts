import {NextRequest} from "next/server";
import {
  badRequestResponse,
  exportVariables,
  internalServerErrorResponse,
  validateApiKeyUser,
  validateEnvironment
} from "@/app/api/helpers";
import {ReadonlyURLSearchParams} from "next/navigation";
import {parseFiltersFromParams} from "@/models/Filters";
import variableRepository from "@/repositories/variable";
import {ProjectParams} from "@/app/api/types";

export async function POST(request: NextRequest, context: { params: ProjectParams }): Promise<Response> {
  const requestBody = await request.json();
  const validation = await validateApiKeyUser(requestBody);

  if (validation.isErr) {
    return badRequestResponse();
  }

  const environment = await validateEnvironment(requestBody);
  if (environment.isErr) {
    return badRequestResponse();
  }

  const searchParams = request.nextUrl.searchParams;
  const readonlySearchParams = new ReadonlyURLSearchParams(searchParams);
  const filters = {
    userId: validation.value.id,
    projectId: context.params.projectId,
    ...parseFiltersFromParams(readonlySearchParams),
    environment: environment.unwrap(),
  };

  const result = await variableRepository.read.all(filters)

  if (result.isErr) {
    return internalServerErrorResponse();
  }

  const variables = result.value;
  const response = exportVariables(variables);

  return new Response(response, {status: 200});
}
