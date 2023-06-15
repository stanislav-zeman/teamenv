'use client'

import { Role } from '@/models/Role'
import { useSignal } from '@preact/signals-react'

interface IFilter {
  order: 'desc' | 'asc'
  search: ''
  dateFrom: Date | null
  dateTo: Date | null
  atLeastRole: Role
}

const getDefaultFilters = (): IFilter => ({
  order: 'desc',
  search: '',
  dateFrom: null,
  dateTo: null,
  atLeastRole: Role.GUEST,
})

const filteringSignal = useSignal<IFilter>(getDefaultFilters())

export const getFilters = () => ({ ...filteringSignal.value })

export const setFilters = (newFilters: IFilter) =>
  (filteringSignal.value = newFilters)
