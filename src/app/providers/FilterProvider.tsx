'use client'
import { setFilters } from '@/signals/filteringSignal'
import { parseFiltersFromParams } from '@/utils/filterUtils'
import { usePathname, useSearchParams } from 'next/navigation'
import { FC, ReactNode, useEffect } from 'react'

export const FilterProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const params = useSearchParams()

  useEffect(() => {
    const filters = parseFiltersFromParams(params)
    setFilters(filters)
  }, [pathname, params])

  return <>{children}</>
}
