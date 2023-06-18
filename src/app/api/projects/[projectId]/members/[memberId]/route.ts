import {NextRequest} from "next/server";
import {getAuth} from "@clerk/nextjs/server";
import {missingUserIdResponse, parseResult} from "@/app/api/helpers";
import {deleteMember} from "@/repositories/user/delete";
import {ModifyMemberData} from "@/repositories/user/types/data";
import {changeRole} from "@/repositories/user/update";

type MemberParams = {
  projectId: string;
  memberId: string,
};


export async function PUT(request: NextRequest, context: { params: MemberParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return missingUserIdResponse();
  }

  const modifyMemberData: ModifyMemberData = {
    userId: userAuth.userId,
    projectId: context.params.projectId,
    memberId: context.params.memberId,
  };

  const result =  await changeRole(modifyMemberData, "GUEST");
  return parseResult(result);
}
export async function DELETE(request: NextRequest, context: { params: MemberParams }): Promise<Response> {
  const userAuth = getAuth(request);
  if (userAuth.userId === null) {
    return missingUserIdResponse();
  }

  const result = await deleteMember({
    userId: userAuth.userId,
    projectId: context.params.projectId,
    memberId: context.params.memberId
  });

  return parseResult(result);
}
