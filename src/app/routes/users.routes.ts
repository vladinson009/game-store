import { Routes } from '@angular/router';
import { Login } from '../features/auth/login/login';
import { Register } from '../features/auth/register/register';
import { Profile } from '../features/profile/profile';
import { guestOnlyGuard } from '../core/guards/guest-only-guard';
import { userOnlyGuard } from '../core/guards/user-only-guard';

// User module
export const usersRoutes: Routes = [
  { path: 'login', component: Login, canActivate: [guestOnlyGuard] },
  { path: 'register', component: Register, canActivate: [guestOnlyGuard] },
  { path: 'profile', component: Profile, canActivate: [userOnlyGuard] },
];
