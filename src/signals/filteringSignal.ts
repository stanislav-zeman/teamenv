'use client'

import { Role } from '@/models/Role'
import { signal, useSignal } from '@preact/signals-react'

export interface IFilter {
  order: 'desc' | 'asc'
  search: string
  dateFrom: Date | null
  dateTo: Date | null
  atLeastRole: Role
  page: number
}

export const getDefaultFilters = (): IFilter => ({
  order: 'desc',
  search: '',
  dateFrom: null,
  dateTo: null,
  atLeastRole: Role.GUEST,
  page: 1,
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

  return params
}

const filteringSignal = signal<IFilter>(getDefaultFilters())

export const getFilters = () => filteringSignal.value

export const setFilters = (newFilters: IFilter) =>
  (filteringSignal.value = newFilters)
