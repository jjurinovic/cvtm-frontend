import { PageFilter } from './page-filter.mode';

export interface PageResponse<T> {
  results: T[];
  page_filter: PageFilter;
}
