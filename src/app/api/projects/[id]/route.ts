import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import read from "@/repositories/project/read";

type Params = {
  id: string;
};


export async function GET(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return new Response(null, { status: 401 });
  }
  const project = await read.specific(context.params.id, user.userId);
  if (project.isErr) {
    return new Response(null, { status: 500 });
  }
  return new Response(JSON.stringify(project.unwrap()), { status: 200 });
}
