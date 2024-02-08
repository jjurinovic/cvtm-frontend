import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { returnUrlQueryParam } from '../utils/url';

export const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // add return url
  const returnUrl = returnUrlQueryParam(state.url);
  router.navigateByUrl('/login' + returnUrl);

  return false;
};
