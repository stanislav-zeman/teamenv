import {Result} from "@badrap/result";

export function missingUserIdResponse(): Response {
  return new Response(null, { status: 401 });
}

export function parseResult<T>(result: Result<T>): Response {
  let status = result.isErr ? 500 : 200;
  return new Response(JSON.stringify(result.unwrap()), { status });
}

