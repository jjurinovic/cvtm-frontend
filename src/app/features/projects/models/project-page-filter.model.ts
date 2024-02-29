import { PageFilter } from 'src/app/shared/models/page-filter.mode';

export interface ProjectPageFilter extends PageFilter {
  companyId: number;
}
