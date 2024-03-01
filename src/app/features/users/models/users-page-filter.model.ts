import { PageFilter } from 'src/app/shared/models/page-filter.model';

export interface UsersPageFilter extends PageFilter {
  companyId?: number;
}
