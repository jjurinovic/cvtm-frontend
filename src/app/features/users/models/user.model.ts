import { Address } from 'src/app/shared/models/address';
import { Role } from '../enums/role.enum';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  company_id: number;
  address?: Address | null;
  created_date?: string;
  updated_date?: string;
  password_changed?: boolean;
}

export interface UserWithReturnUrl extends User {
  returnUrl: string;
}
