import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { MyProject } from '@/models/Project'
import { useQuery } from '@tanstack/react-query'

export const getMyProjectKey = (projectId: string) => [projectId, 'myProject']

export const useProject = (projectId: string) =>
  useQuery<MyProject | undefined>(getMyProjectKey(projectId), () =>
    mockedMyProjects.docs.find((project) => project.id === projectId)
  )
