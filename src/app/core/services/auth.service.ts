import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import type {
  AuthUserResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../../models/user';
import { authEndpoints } from '../../shared/constants/apiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userData = signal<AuthUserResponse | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  public isLoggedIn = computed(() => !!this._userData());

  public login(credentials: LoginCredentials): Observable<AuthUserResponse> {
    return this.http
      .post<AuthUserResponse>(authEndpoints.login, credentials)
      .pipe(
        tap((res) => {
          this._userData.set(res);
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
          this.router.navigate(['/']);
        })
      );
  }
  public logout() {
    this._userData.set(null);
    this.router.navigate(['/']);
  }

  public get user() {
    return this._userData;
  }
}
