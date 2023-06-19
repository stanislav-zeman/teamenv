import { Role } from "@/models/Role"
import { ReadonlyURLSearchParams } from "next/navigation"

type DisplayOptions = 'all' | 'deleted' | 'non-deleted'

export interface IFilter {
  order: 'desc' | 'asc'
  search: string
  dateFrom: Date | null
  dateTo: Date | null
  atLeastRole: Role
  display: DisplayOptions
  page: number
}

export const parseFiltersFromParams = (
  params: ReadonlyURLSearchParams
): IFilter => {
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
    display: (params.get('display') as DisplayOptions) ?? 'all',
  }
}

export const getDefaultFilters = (): IFilter => ({
  order: 'desc',
  search: '',
  dateFrom: null,
  dateTo: null,
  atLeastRole: Role.GUEST,
  page: 1,
  display: 'all',
})