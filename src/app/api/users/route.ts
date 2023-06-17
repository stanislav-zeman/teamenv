import {NextRequest} from "next/server";
import {getAll} from "@/repositories/user/read";

export async function GET(request: NextRequest): Promise<Response> {
  const searchField: string = request.nextUrl.searchParams.get("search") ?? "";
  const result = await getAll(searchField);

  if (result.isErr) {
    return new Response(null, { status: 500 });
  }

  return new Response(JSON.stringify(result.unwrap()), { status: 200 });
}
