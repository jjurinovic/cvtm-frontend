import { Role } from '../features/users/enums/role.enum';

export const NAVIGATION_LINKS = [
  {
    link: '/admin',
    title: 'Admin',
    minRole: Role.ROOT,
  },
  {
    link: '/dashboard',
    title: 'Dashboard',
  },
  {
    link: '/company',
    title: 'Company',
  },
  {
    link: '/users',
    title: 'Users',
    minRole: Role.MODERATOR,
  },
  {
    link: '/projects',
    title: 'Projects',
    minRole: Role.MODERATOR,
  },
  {
    link: '/time-tracking',
    title: 'Time Tracking',
  },
];
