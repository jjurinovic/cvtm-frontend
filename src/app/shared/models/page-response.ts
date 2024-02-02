export interface PageResponse<T> {
  size: number;
  page: number;
  total: number;
  results: T[];
  sort: string | null;
  q: string | null;
  sort_field: string | null;
}
