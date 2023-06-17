import {NextRequest} from "next/server";
import {all} from "@/repositories/user/read";
import {parseFiltersFromParams} from "@/signals/filteringSignal";
import {ReadonlyURLSearchParams} from "next/navigation";


// TODO: All users based on search filter (emails, usernames)
export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;
  const readonlySearchParams = new ReadonlyURLSearchParams(searchParams);
  const filters = parseFiltersFromParams(readonlySearchParams)

  const result = await all(filters);

  if (result.isErr) {
    return new Response(null, { status: 500 });
  }

  const response = result.unwrap()
  return new Response(JSON.stringify(response), { status: 200 });
}
