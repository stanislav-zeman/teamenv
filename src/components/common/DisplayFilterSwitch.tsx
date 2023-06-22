import useFilters from '@/app/hooks/useFilters'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import {IconButton} from '@chakra-ui/react'

export const DisplayFilterSwitch = () => {
  const { filters, pushFilters } = useFilters()

  const handleToggleFilter = () => {
    pushFilters(
      'display',
      filters.display === 'non-deleted' ? 'all' : 'non-deleted'
    )
  }

  return (
    <IconButton
      aria-label={'Hide disabled'}
      isActive={filters.display === 'non-deleted'}
      onClick={handleToggleFilter}
      icon={filters.display === 'non-deleted' ? <ViewOffIcon /> : <ViewIcon />}
    />
  )
}
