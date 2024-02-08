import { Address } from 'src/app/shared/models/address.model';
import { Role } from '../enums/role.enum';
import { Company } from '../../company/models/company.model';
import { LocalParams } from 'src/app/shared/models/local-params.model';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  company_id: number;
  company?: Company | null;
  address?: Address | null;
  created_date?: string;
  updated_date?: string;
  password_changed?: boolean;
  deleted?: boolean;
  inactive?: boolean;
}

export interface UserWithLocalParams extends User, LocalParams {}
