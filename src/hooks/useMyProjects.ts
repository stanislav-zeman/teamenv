import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { MyProject } from '@/models/Project'
import { useQuery } from '@tanstack/react-query'

export const getMyProjectsKey = () => ['myProjects']

// TODO Wire to proper logic
export const useMyProjects = (userId: string) =>
  useQuery<MyProject[]>(getMyProjectsKey(), () => mockedMyProjects)
