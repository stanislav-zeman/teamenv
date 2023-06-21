import { BaseFilters } from '@/models/Filters'
import { Pageable } from '@/models/Pageable'
import { MyProject } from '@/models/Project'
import { filteringSignalToSearchParams } from '@/signals/filteringSignal'
import { Project } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import BaseFilter from 'next/dist/shared/lib/bloom-filter/base-filter'
import environment from "@/utils/envMetadata";
import { ProjectSummary } from '@/repositories/project/types/data'

export const getMyProjectsKey = () => ['myProjects']

export const useMyProjects = () => {
  const filters = filteringSignalToSearchParams()
  return useQuery<Pageable<ProjectSummary>>(getMyProjectsKey(), async () =>
    axios
      .get(`${environment.HOST}/api/projects?${filters}`)
      .then((res) => res.data)
  )
}
