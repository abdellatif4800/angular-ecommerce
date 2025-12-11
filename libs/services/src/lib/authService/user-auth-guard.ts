import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSerivce } from './auth.serivce';
import { Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authServices = inject(AuthSerivce);
  const router = inject(Router);

  if (authServices.getToken()) {
    return true;
  } else {
    authServices.openLoginForm();
    authServices.redirectUrl.set(route.routeConfig?.path);

    return false;
  }
};
