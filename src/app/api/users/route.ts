import {NextRequest} from "next/server";
import {getAll} from "@/repositories/user/read";

// TODO: All users based on search filter (emails, usernames)
export async function GET(request: NextRequest): Promise<Response> {
  const searchField: string | undefined = request.nextUrl.searchParams.get("search") ?? undefined;
  const result = await getAll(searchField);

  if (result.isErr) {
    return new Response(null, { status: 500 });
  }

  return new Response(JSON.stringify(result.unwrap()), { status: 200 });
}
