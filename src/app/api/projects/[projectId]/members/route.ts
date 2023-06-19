import { NextRequest } from 'next/server'
import { unauthorizedResponse, parseResult } from '@/app/api/helpers'
import { getAuth } from '@clerk/nextjs/server'
import { ProjectMemberData, ProjectParams } from '@/app/api/types'
import { createProjectMember } from '@/repositories/user/create'

export async function POST(
  request: NextRequest,
  context: { params: ProjectParams }
): Promise<Response> {
  const userAuth = getAuth(request)
  if (userAuth.userId === null) {
    return unauthorizedResponse()
  }
  console.log(request)
  const data = JSON.parse(await request.json())
  const result = await createProjectMember({
    userId: userAuth.userId,
    projectId: context.params.projectId,
    ...data,
  })

  return parseResult(result, 201)
}
