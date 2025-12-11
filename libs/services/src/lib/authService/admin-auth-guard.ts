import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSerivce } from './auth.serivce';
import { Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authServices = inject(AuthSerivce);
  const router = inject(Router);

  if (authServices.getToken()) {
    return true;
  }
  return router.createUrlTree(['/auth']);
  // return false;

};
