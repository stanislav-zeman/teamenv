import {NextRequest} from "next/server";
import read from "../../../repositories/project/read";
import {getAuth} from "@clerk/nextjs/server";
import {ReadonlyURLSearchParams} from "next/navigation";
import {missingUserIdResponse} from "@/app/api/helpers";
import {parseFiltersFromParams} from "@/models/Filters";

export async function GET(request: NextRequest) : Promise<Response> {
  const user = getAuth(request);

  if (!user.userId) {
    return missingUserIdResponse();
  }

  const searchParams = request.nextUrl.searchParams;
  const readonlySearchParams = new ReadonlyURLSearchParams(searchParams);
  const filters = { userId: user.userId, ...parseFiltersFromParams(readonlySearchParams) }

  const result = await read.all(filters);

  if (result.isErr) {
    return new Response(null, {status: 500})
  }

  return new Response(JSON.stringify(result), {status: 200});
}
