import { queryClient } from '@/app/providers/ReactQueryProvider'
import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { useMutation } from '@tanstack/react-query'
import { getMyProjectsKey } from '../useMyProjects'
import { getMyProjectKey } from '../useProject'

export const useChangeProjectName = (projectId: string) => {
  return useMutation((projectName: string) => {
    const project = mockedMyProjects.docs.filter((p) => p.id === projectId)[0]
    if (!project) return
    project.name = projectName
    queryClient.invalidateQueries(getMyProjectsKey())
    queryClient.invalidateQueries(getMyProjectKey(projectId))
    return new Promise(() => {})
  })
}
