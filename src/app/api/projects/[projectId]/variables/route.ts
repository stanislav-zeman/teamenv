import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import variables from "@/repositories/variable";
import {unauthorizedResponse, Params, parseResult, badRequestResponse} from "@/app/api/helpers";
import {z} from "zod";

const postValidator = z.object({
  name: z.string(),
  value: z.string(),
}).strict()

export async function POST(request: NextRequest, context: { params: Params }): Promise<Response> {
  const user = getAuth(request);
  if (user.userId === null) {
    return unauthorizedResponse();
  }

  const payload = await request.json();
  const validationResult = postValidator.safeParse(payload);

  if (!validationResult.success) {
    return badRequestResponse();
  }

  const data = validationResult.data

  const result = await variables.create({
    userId: user.userId,
    projectId: context.params.projectId,
    ...data
  });

  return parseResult(result, 201);
}
