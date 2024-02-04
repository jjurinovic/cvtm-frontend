export interface UsersRequest {
  companyId: number;
  page: number;
  size: number;
  sort?: string | null;
  sortField?: string | null;
  q?: string | null;
}
