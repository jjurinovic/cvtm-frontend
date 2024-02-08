import { PageRequest } from 'src/app/shared/models/page-request.model';

export interface UsersRequest extends PageRequest {
  companyId: number;
}
