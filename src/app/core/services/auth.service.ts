import type {
  AuthUserResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../../models/user';

import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';

import { authEndpoints } from '../../shared/constants/apiEndpoints';
import { tokenStorage } from '../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = signal<AuthUserResponse | null>(null);
  public user = this._userData.asReadonly();
  public isLoggedIn = computed(() => !!this._userData());

  constructor(private http: HttpClient, private router: Router) {}

  private setLocalStorage(token: string) {
    localStorage.setItem(tokenStorage, token);
  }
  public getLocalStorage() {
    return localStorage.getItem(tokenStorage);
  }
  public clearLocalStorage() {
    this._userData.set(null);
    localStorage.removeItem(tokenStorage);
  }
  //When login and register, set user data in app state and add auth token in local storage
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
  // When logout, invalidate token in server, clear state and local storage in private method
  public logout() {
    return this.http
      .get<Observable<AuthUserResponse>>(authEndpoints.logout)
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          this.router.navigate(['/']);
        })
      );
  }

  // When browser refresh, if it is token in the local storage, send auth request and retrieve user data to app state
  public retrieveUser(): Observable<AuthUserResponse> {
    return this.http.get<AuthUserResponse>(authEndpoints.me).pipe(
      tap((res) => {
        this._userData.set(res);
      })
    );
  }
}
