import { Routes } from '@angular/router';
import { GameList } from './features/games/game-list/game-list';
import { Home } from './layout/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'games', component: GameList },
  { path: 'users/login', component: Login },
  { path: 'users/register', component: Register },
];
