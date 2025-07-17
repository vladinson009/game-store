import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, throwError } from 'rxjs';
import { UiService } from '../services/ui.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const uiService = inject(UiService);

  const user = authService.user();

  if (user) {
    const authReq = req.clone({
      setHeaders: { 'x-authorization': user.token },
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          authService.clearLocalStorage();
          uiService.openSnackBar(error.error?.error, 'Login Here', 8000, {
            redirectTo: '/users/login',
          });
          //TODO Error Cases
          return EMPTY;
        }

        return throwError(() => error);
      })
    );
  }

  return next(req);
};
