import { Routes } from '@angular/router';
import { GameList } from './features/games/game-list/game-list';
import { Home } from './layout/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { CreateGame } from './features/games/create-game/create-game';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'games', component: GameList, pathMatch: 'full' },
  { path: 'games/create', component: CreateGame },
  { path: 'users/login', component: Login },
  { path: 'users/register', component: Register },
];
