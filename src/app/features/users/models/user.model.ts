import { Address } from 'src/app/shared/models/address';
import { Role } from '../enums/role.enum';
import { Company } from '../../company/models/company.model';

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
}

export interface UserWithLocalProps extends User {
  returnUrl: string | null;
  myId?: number | null;
}
