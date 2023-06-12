import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { BaseFilters } from '@/models/Filters'
import { Pageable } from '@/models/Pageable'
import { MyProject } from '@/models/Project'
import { useQuery } from '@tanstack/react-query'
import BaseFilter from 'next/dist/shared/lib/bloom-filter/base-filter'

export const getMyProjectsKey = () => ['myProjects']

// TODO Wire to proper logic
export const useMyProjects = (
  userId: string,
  filters: Partial<BaseFilters>
) => {
  return useQuery<Pageable<MyProject>>(
    getMyProjectsKey(),
    () => mockedMyProjects
  )
}
