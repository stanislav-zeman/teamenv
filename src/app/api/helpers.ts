import {Result} from "@badrap/result";

export type Params = {
  projectId: string;
};

export function missingUserIdResponse(): Response {
  return new Response(null, { status: 401 });
}

export function parseResult<T>(result: Result<T>, successStatus: number): Response {
  let status = result.isErr ? 500 : successStatus;
  return new Response(JSON.stringify(result.unwrap()), { status });
}

