'use client'
import { Role } from '@/models/Role'
import {
  IFilter,
  getDefaultFilters,
  parseFiltersFromParams,
  setFilters,
} from '@/signals/filteringSignal'
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'
import { parseArgs } from 'util'

export const FilterProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    const filters = parseFiltersFromParams(params)
    setFilters(filters)
  }, [pathname, params])

  return <>{children}</>
}
