import {NextRequest} from "next/server";
import {getAll} from "@/repositories/user/read";
import {ReadonlyURLSearchParams} from "next/navigation";
import {parseFiltersFromParams} from "@/models/Filters";


export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const readonlySearchParams = new ReadonlyURLSearchParams(searchParams);
  const filters = parseFiltersFromParams(readonlySearchParams)

  const result = await getAll(filters);

  if (result.isErr) {
    return new Response(null, { status: 500 });
  }

  const response = result.unwrap()
  return new Response(JSON.stringify(response), { status: 200 });
}
