import { PageFilter } from 'src/app/shared/models/page-filter.mode';

export interface UsersPageFilter extends PageFilter {
  companyId?: number;
}
