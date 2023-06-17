import {NextRequest, NextResponse} from "next/server";
import read from "../../../repositories/project/read";
import {getAuth} from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  console.log(getAuth(request))
  const res = await read.all();
  return NextResponse.json(res.unwrap());
}
