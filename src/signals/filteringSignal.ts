import { Role } from '@/models/Role'
import { signal } from '@preact/signals-react'
import { ReadonlyURLSearchParams } from 'next/navigation'

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

export const filteringSignalToSearchParams = (): URLSearchParams => {
  const params = new URLSearchParams()
  params.set('order', filteringSignal.value.order)
  params.set('search', filteringSignal.value.search)
  params.set('dateFrom', filteringSignal.value.dateFrom?.toISOString() ?? '')
  params.set('dateTo', filteringSignal.value.dateTo?.toISOString() ?? '')
  params.set(
    'atLeastRole',
    filteringSignal.value.atLeastRole.valueOf().toString()
  )
  params.set('page', filteringSignal.value.page.toString())
  params.set('display', filteringSignal.value.display)

  return params
}

const filteringSignal = signal<IFilter>(getDefaultFilters())

export const getFilters = () => filteringSignal.value

export const setFilters = (newFilters: IFilter) =>
  (filteringSignal.value = newFilters)
