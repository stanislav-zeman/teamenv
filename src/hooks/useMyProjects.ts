import { mockedMyProjects } from '@/mocks/myProjectsMock'
import { BaseFilters } from '@/models/Filters'
import { Pageable } from '@/models/Pageable'
import { MyProject } from '@/models/Project'
import { filteringSignalToSearchParams } from '@/signals/filteringSignal'
import { Project } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import BaseFilter from 'next/dist/shared/lib/bloom-filter/base-filter'
import environment from "@/utils/envMetadata";

export const getMyProjectsKey = () => ['myProjects']

const listToMockPagable = (list: MyProject[]): Pageable<MyProject> => {
  return {
    docs: [...list],
    page: 1,
    pages: 4,
    limit: 6,
    total: 8,
  }
}

// TODO Wire to proper logic
export const useMyProjects = () => {
  const filters = filteringSignalToSearchParams()

  return useQuery<Pageable<MyProject>>(getMyProjectsKey(), async () =>
    axios
      .get(`${environment.HOST}/api/projects?${filters}`)
      .then((res) => listToMockPagable(res.data))
  )
}
