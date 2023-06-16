import { BaseFilters, UrlFilters } from '@/models/Filters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { filter } from '@chakra-ui/react'
import { filterProps } from 'framer-motion'
import {
  filteringSignalToSearchParams,
  getFilters,
} from '@/signals/filteringSignal'

function parseFilters<T>(urlString: string): Partial<T> {
  return queryString.parse(urlString) as Partial<T>
}

export default function useFilters() {
  const filters = getFilters()
  const router = useRouter()
  const pathname = usePathname()

  const pushFilters = (fieldName: string, value: string) => {
    const params = new URLSearchParams(filteringSignalToSearchParams())
    params.set(fieldName, value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return { filters, pushFilters }
}
