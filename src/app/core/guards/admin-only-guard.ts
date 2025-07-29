import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminOnlyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin: boolean = authService.user()?.role === 'admin';

  if (isAdmin) {
    return true;
  }
  return router.createUrlTree(['/not-found']);
};
