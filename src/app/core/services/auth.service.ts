import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, Observable, tap, throwError } from 'rxjs';

import type {
  AuthUserResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../../models/user';

import { authEndpoints } from '../../shared/constants/apiEndpoints';
import { tokenStorage } from '../../shared/constants/constants';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = signal<AuthUserResponse | null>(null);
  public isLoggedIn = computed(() => !!this._userData());

  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UiService
  ) {}

  public get user() {
    return this._userData;
  }
  private setLocalStorage(token: string) {
    localStorage.setItem(tokenStorage, token);
  }
  public getLocalStorage() {
    return localStorage.getItem(tokenStorage);
  }
  private clearLocalStorage() {
    localStorage.removeItem(tokenStorage);
  }
  public login(credentials: LoginCredentials): Observable<AuthUserResponse> {
    return this.http
      .post<AuthUserResponse>(authEndpoints.login, credentials)
      .pipe(
        tap((res) => {
          this._userData.set(res);
          this.setLocalStorage(res.token);
          this.router.navigate(['/']);
        })
      );
  }
  public register(
    credentials: RegisterCredentials
  ): Observable<AuthUserResponse> {
    return this.http
      .post<AuthUserResponse>(authEndpoints.register, credentials)
      .pipe(
        tap((res) => {
          this._userData.set(res);
          this.setLocalStorage(res.token);
          this.router.navigate(['/']);
        })
      );
  }
  public logout() {
    return this.http
      .get<Observable<AuthUserResponse>>(authEndpoints.logout, {
        headers: { 'x-authorization': this.user()?.token || 'magic-string' },
      })
      .pipe(
        tap(() => {
          this._userData.set(null);
          this.clearLocalStorage();
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          this.clearLocalStorage();
          this.uiService.openSnackBar('Unauthorized Logout Request', '', 8000, {
            redirectTo: '/',
          });
          return throwError(() => error);
        })
      );
  }
  public retrieveUser(): Observable<AuthUserResponse> {
    const token = this.getLocalStorage() || 'magic-string';
    return this.http
      .get<AuthUserResponse>(authEndpoints.me, {
        headers: { 'x-authorization': token },
      })
      .pipe(
        tap((res) => {
          this._userData.set(res);
        }),
        catchError((error) => {
          this.clearLocalStorage();
          this.uiService.openSnackBar('Invalid Session', 'Login Here', 8000, {
            redirectTo: '/users/login',
          });
          return throwError(() => error);
        })
      );
  }
}
