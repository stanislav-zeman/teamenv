import {Role} from '@/models/Role'
import {Environment} from '@prisma/client'
import {ReadonlyURLSearchParams} from 'next/navigation'

export type DisplayOptions = 'all' | 'deleted' | 'non-deleted'

export interface IFilter {
  order: 'desc' | 'asc'
  search: string
  dateFrom: Date | null
  dateTo: Date | null
  atLeastRole: Role
  display: DisplayOptions
  page: number
  pageSize: number,
  ignoreProject?: string
  environment: Environment
}

export interface UrlFilters {
  page: number
}

export interface BaseFilters extends UrlFilters {
  limit: number
}

export interface ProjectFilters extends IFilter {
  userId: string
}

export interface VariableFilters extends IFilter {
  userId: string
  projectId: string
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
      ? (params.get('atLeastRole') as Role) || Role.GUEST
      : defaultFilters.atLeastRole,
    page: +(params.get('page') ?? defaultFilters.page),
    pageSize: +(params.get("pageSize") ?? defaultFilters.pageSize),
    display: (params.get('display') as DisplayOptions) ?? 'all',
    ignoreProject: params.get("ignoreProject") ?? defaultFilters.ignoreProject,
    environment: params.get("environment") as Environment ?? Environment.PREVIEW
  }
}

export const getDefaultFilters = (): IFilter => ({
  order: 'desc',
  search: '',
  dateFrom: null,
  dateTo: null,
  atLeastRole: Role.GUEST,
  page: 1,
  pageSize: 9,
  display: 'all',
  ignoreProject: undefined,
  environment: Environment.PREVIEW
})
