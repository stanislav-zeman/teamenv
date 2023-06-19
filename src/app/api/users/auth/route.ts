import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {ensureUser} from "@/repositories/user/create";
import {clerkClient} from "@clerk/nextjs";
import {internalServerErrorResponse, unauthorizedResponse} from "@/app/api/helpers";


export async function POST(request: NextRequest): Promise<Response> {
  const userAuth = getAuth(request);
  if (!userAuth.userId) {
    console.log("no user id");
    return unauthorizedResponse();
  }

  const user = await clerkClient.users.getUser(userAuth.userId);
  const username = user.username ?? "";
  let email: string;
  if (user.emailAddresses.length > 0) {
    email = user.emailAddresses[0].emailAddress;
  } else {
    email = ''
  }

  const result = await ensureUser({id: user.id, email, username});
  if (result.isErr) {
    console.log(result.unwrap())
    return internalServerErrorResponse();
  }

  return new Response(null, { status: result.unwrap() ? 201 : 200 })
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 204 })
}
