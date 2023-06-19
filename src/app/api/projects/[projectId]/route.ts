import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import read from "@/repositories/project/read";
import {parseResult, unauthorizedResponse} from "@/app/api/helpers";
import {ProjectParams} from "@/app/api/types";

export async function GET(request: NextRequest, context: { params: ProjectParams }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const result = await read.specific(context.params.projectId, user.userId);

  return parseResult(result, 200) ;
}
