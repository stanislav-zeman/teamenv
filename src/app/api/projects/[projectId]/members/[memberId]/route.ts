import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {unauthorizedResponse, parseResult} from "@/app/api/helpers";
import {deleteMember} from "@/repositories/user/delete";
import {ModifyMemberData} from "@/repositories/user/types/data";
import {changeRole} from "@/repositories/user/update";
import {MemberParams, ProjectMemberUpdateData} from "@/app/api/types";


export async function PUT(request: NextRequest, context: { params: MemberParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return unauthorizedResponse();
  }

  const modifyMemberData: ModifyMemberData = {
    userId: userAuth.userId,
    projectId: context.params.projectId,
    memberId: context.params.memberId,
  };

  const data: ProjectMemberUpdateData = JSON.parse(await request.json());
  const result =  await changeRole(modifyMemberData, data.role);
  return parseResult(result, 200);
}
export async function DELETE(request: NextRequest, context: { params: MemberParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return unauthorizedResponse();
  }

  const result = await deleteMember({
    userId: userAuth.userId,
    projectId: context.params.projectId,
    memberId: context.params.memberId
  });

  return parseResult(result, 200);
}
