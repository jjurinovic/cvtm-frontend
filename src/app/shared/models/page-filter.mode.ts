export interface PageFilter {
  size: number;
  page: number;
  total?: number;
  sort?: string | null;
  q?: string | null;
  sort_field?: string | null;
}
