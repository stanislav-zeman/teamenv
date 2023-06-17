'use client'

import React, { ChangeEvent, ChangeEventHandler, FC, useState } from 'react'
import {
  filteringSignalToSearchParams,
  getFilters,
} from '@/signals/filteringSignal'
import { usePathname, useRouter } from 'next/navigation'
import useFilters from '@/app/hooks/useFilters'
import { placeholderRandomizer } from '@/utils/placeholderRandomizer'

const GenericLolInput: FC = () => {
  const { filters, pushFilters } = useFilters()
  const [search, setSearch] = useState(filters.search)

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      pushFilters('search', search)
    }
  }

  return (
    <input
      placeholder={placeholderRandomizer()}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => handleInputChange(e)}
      defaultValue={filters.search}
      className={`bg-neutral-100" border-stone-900 text-black border rounded-md px-2 py`}
    />
  )
}

export default GenericLolInput
