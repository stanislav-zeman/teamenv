import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {ensureUser} from "@/repositories/user/create";


export async function POST(request: NextRequest): Promise<Response> {
  const user = getAuth(request);
  if (!user.userId) {
    console.log("no user id");
    return new Response(null, { status: 401 });
  }

  const username = user.user?.username ?? "";
  let email: string;
  if (user.user?.emailAddresses) {
    email = user.user.emailAddresses[0].emailAddress;
  } else {
    email = "";
  }

  const result = await ensureUser({id: user.userId, email, username});
  if (result.isErr) {
    console.log(result.unwrap());
    return new Response(null, { status: 500 });
  }

  return new Response(null, { status: result.unwrap() ? 201 : 200 });
}
