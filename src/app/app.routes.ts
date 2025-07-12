import { Routes } from '@angular/router';
import { GameList } from './features/games/game-list/game-list';
import { Home } from './layout/home/home';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'games', component: GameList },
];
