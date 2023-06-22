import {NextRequest} from "next/server";
import {badRequestResponse, parseResult, validateApiKeyUser} from "@/app/api/helpers";
import projectRepository from "@/repositories/project";
import {ReadonlyURLSearchParams} from "next/navigation";
import {parseFiltersFromParams} from "@/models/Filters";

export async function GET(request: NextRequest): Promise<Response> {
  const validation = await validateApiKeyUser(request);
  
  if (validation.isErr) {
    return badRequestResponse();
  }
  
  const searchParams = request.nextUrl.searchParams;
  const readonlySearchParams = new ReadonlyURLSearchParams(searchParams);
  const filters = {
    userId: validation.value.id,
    ...parseFiltersFromParams(readonlySearchParams),
  };

  const result = await projectRepository.read.all(filters);

  return parseResult(result, 200);
}