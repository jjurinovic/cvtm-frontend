import { PageFilter } from 'src/app/shared/models/page-filter.model';

export interface ProjectPageFilter extends PageFilter {
  companyId: number;
}
