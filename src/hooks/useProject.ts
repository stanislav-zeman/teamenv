import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { MyProject } from '@/models/Project'
import { useQuery } from '@tanstack/react-query'

export const getMyProjectsKey = (projectId: string) => [projectId, 'myProject']

export const useProject = (projectId: string) =>
  useQuery<MyProject | undefined>(getMyProjectsKey(projectId), () =>
    mockedMyProjects.docs.find((project) => project.id === projectId)
  )
