import {NextRequest, NextResponse} from "next/server";
import read from "../../../repositories/project/read";

type Params = {
  id: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const res = await read.all();
  return NextResponse.json(res.unwrap());
}
