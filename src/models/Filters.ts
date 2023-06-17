import {IFilter} from "@/signals/filteringSignal";

export interface UrlFilters {
  page: number
}

export interface BaseFilters extends UrlFilters {
  limit: number
}

export interface ProjectFilters extends IFilter {
  userId: string
}