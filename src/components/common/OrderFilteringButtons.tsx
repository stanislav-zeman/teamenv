'use client'

import useFilters from '@/app/hooks/useFilters'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
export const OrderFilteringButtons = () => {
  const { filters, pushFilters } = useFilters()

  return (
    <div className="flex gap-3">
      <IconButton
        aria-label="sort asc"
        isActive={filters.order === 'asc'}
        icon={<ChevronUpIcon />}
        onClick={() => pushFilters('order', 'asc')}
      />
      <IconButton
        aria-label="sort desc"
        isActive={filters.order === 'desc'}
        icon={<ChevronDownIcon />}
        onClick={() => pushFilters('order', 'desc')}
      />
    </div>
  )
}
