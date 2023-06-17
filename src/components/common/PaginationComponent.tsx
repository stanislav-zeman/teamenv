import useFilters from '@/app/hooks/useFilters'
import { Pageable } from '@/models/Pageable'
import { SxProps } from '@mui/material'
import { FC } from 'react'
import Pagination from '@mui/material/Pagination'

interface IPagination {
  pageable: Pageable<any>
  sx?: SxProps
}

export const PaginationComponent: FC<IPagination> = ({ pageable, sx }) => {
  const { filters, pushFilters } = useFilters()

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    pushFilters('page', value.toString())
  }

  return (
    <Pagination
      sx={{ ...sx }}
      count={pageable.pages}
      onChange={handleChangePage}
      defaultPage={1}
      siblingCount={2}
      page={filters.page}
    />
  )
}
