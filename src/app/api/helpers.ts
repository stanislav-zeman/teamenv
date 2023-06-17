
export function missingUserIdResponse(): Response {
  return new Response(null, { status: 401 });
}

