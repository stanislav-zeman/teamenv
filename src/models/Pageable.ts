export interface Pageable<T> {
  docs: T[]
  page: number
  pages: number
  limit: number
  total: number
}
