import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {Variable} from "@/models/Variable";
import variables from "@/repositories/variable";
import {missingUserIdResponse, Params, parseResult} from "@/app/api/helpers";
import {VariableCreateData} from "@/app/api/types";


export async function POST(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return missingUserIdResponse();
  }

  const data: VariableCreateData = JSON.parse(await request.json())

  const result = await variables.create({
    projectId: context.params.projectId,
    name: data.name,
    value: data.value,
    minimalAccessRole: undefined,
  });

  return parseResult(result, 201);
}
