import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {internalServerErrorResponse, unauthorizedResponse} from "@/app/api/helpers";
import {ReadonlyURLSearchParams} from "next/navigation";
import {parseFiltersFromParams} from "@/models/Filters";
import {ProjectParams} from "@/app/api/types";
import variableRepository from "@/repositories/variable";

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

  if (result.isErr) {
    return internalServerErrorResponse();
  }

  const response = result.value
    .map(variable => `${variable.name}=${variable.value}`)
    .join("\n");

  return new Response(response, { status: 200 });
}