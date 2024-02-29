import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from '../../users/enums/role.enum';

export const companyListGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRole() === Role.ROOT) return true;

  router.navigateByUrl('company/info');

  return false;
};
