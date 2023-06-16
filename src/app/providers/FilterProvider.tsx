'use client'
import { Role } from '@/models/Role'
import {
  IFilter,
  getDefaultFilters,
  setFilters,
} from '@/signals/filteringSignal'
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'
import { parseArgs } from 'util'

const parseFiltersFromParams = (params: ReadonlyURLSearchParams): IFilter => {
  const defaultFilters = getDefaultFilters()
  return {
    order: (params.get('order') as 'desc' | 'asc') ?? defaultFilters.order,
    search: params.get('search') ?? defaultFilters.search,
    dateFrom: !!params.get('dateFrom')
      ? new Date(params.get('dateFrom') || '')
      : defaultFilters.dateFrom,
    dateTo: !!params.get('dateTo')
      ? new Date(params.get('dateTo') || '')
      : defaultFilters.dateTo,
    atLeastRole: params.get('atLeastRole')
      ? +(params.get('atLeastRole') || 0)
      : defaultFilters.atLeastRole,
    page: +(params.get('page') ?? defaultFilters.page),
  }
}

export const FilterProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    const filters = parseFiltersFromParams(params)
    setFilters(filters)
  }, [pathname, params])

  return <>{children}</>
}
