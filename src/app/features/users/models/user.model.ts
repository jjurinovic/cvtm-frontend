import { Address } from 'src/app/shared/models/address';
import { Role } from '../enums/role.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  company_id: number;
  address?: Address | null;
}
