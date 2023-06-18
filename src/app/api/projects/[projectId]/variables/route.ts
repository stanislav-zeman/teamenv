import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {Variable} from "@/models/Variable";
import variables from "@/repositories/variable";

type Params = {
  projectId: string;
};

export async function POST(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return new Response(null, { status: 401 });
  }

  // TODO: Swap for prisma model
  const variable: Variable = JSON.parse(await request.json())

  const result = await variables.create({
    projectId: context.params.projectId,
    name: variable.name,
    value: variable.value,
    minimalAccessRole: undefined,
  });

  if (result.isErr) {
    return new Response(null, { status: 500 });
  }

  const response = result.unwrap()
  return new Response(JSON.stringify(response), { status: 201 });
}
