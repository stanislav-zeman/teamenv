import {NextRequest} from "next/server";
import {all} from "@/repositories/user/read";
import {ReadonlyURLSearchParams} from "next/navigation";
import {parseFiltersFromParams} from "@/models/Filters";
import {parseResult} from "@/app/api/helpers";


export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams
  const readonlySearchParams = new ReadonlyURLSearchParams(searchParams)
  const filters = parseFiltersFromParams(readonlySearchParams)

  const result = await all(filters)

  return parseResult(result, 200);
}
