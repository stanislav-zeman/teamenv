import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import read from "@/repositories/project/read";

type Params = {
  projectId: string;
};


export async function GET(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return new Response(null, { status: 401 });
  }

  const result = await read.specific(context.params.projectId, user.userId);

  if (result.isErr) {
    return new Response(null, { status: 500 });
  }

  const project = result.unwrap();
  return new Response(JSON.stringify(project), { status: 200 });
}
