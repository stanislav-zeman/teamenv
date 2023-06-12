import { BaseFilters, UrlFilters } from '@/models/Filters'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { filter } from '@chakra-ui/react'
import { filterProps } from 'framer-motion'

function parseFilters<T>(urlString: string): Partial<T> {
  return queryString.parse(urlString) as Partial<T>
}

export default function useFilters<T>() {
  const params = useSearchParams().toString()
  const [filters, setFilters] = useState<Partial<T>>(parseFilters(params))

  useEffect(
    () => setFilters(parseFilters(params)),
    [useSearchParams().toString()]
  )

  return filters
}
