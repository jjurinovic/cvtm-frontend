import { Role } from 'src/app/features/users/enums/role.enum';

export interface NavItem {
  link: string;
  title: string;
  minRole?: Role;
  excludeRole?: Role;
}
