import { ProjectMemberData } from '@/app/api/types'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useAddUserToProject = (projectId: string) => {
  return useMutation(
    async (data: ProjectMemberData) =>
      await axios
        .post(`http://localhost:3000/api/projects/${projectId}/members`, {
          ...data,
        })
        .then((res) => res.data)
  )
}
