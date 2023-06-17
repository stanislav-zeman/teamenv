import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {ProjectData} from "@/repositories/project/types/data";
import read from "@/repositories/project/read";

type Params = {
  id: string;
};


async function GET(request: NextRequest, context: { params: Params }): Promise<ProjectData> {
  const user = getAuth(request);
  if (user.userId === null) {
    throw new Error("no userId");
  }
  const project = await read.specific(context.params.id, user.userId);
  if (project.isErr) {
    throw project.error;
  }
  return project.unwrap();
}
