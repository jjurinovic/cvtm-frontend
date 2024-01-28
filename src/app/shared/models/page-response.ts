export interface PageResponse<T> {
  size: number;
  page: number;
  total: number;
  results: T[];
}
