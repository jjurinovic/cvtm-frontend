import { PageFilter } from './page-filter.model';

export interface PageResponse<T> {
  results: T[];
  page_filter: PageFilter;
}
