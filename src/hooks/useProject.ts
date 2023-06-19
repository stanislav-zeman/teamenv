import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { MyProject } from '@/models/Project'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const getMyProjectKey = (projectId: string) => [projectId, 'myProject']

export const useProject = (projectId: string) =>
  useQuery<MyProject | undefined>(
    getMyProjectKey(projectId),
    async () =>
      await axios
        .get(`ttp://localhost:3000/api/projects/${projectId}`)
        .then((res) => res.data as MyProject)
  )
