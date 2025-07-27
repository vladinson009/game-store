import { Routes } from '@angular/router';
import { GameList } from '../features/games/game-list/game-list';
import { CreateGame } from '../features/games/create-game/create-game';
import { GameDetails } from '../features/games/game-details/game-details';
import { GameEdit } from '../features/games/game-edit/game-edit';
import { userOnlyGuard } from '../core/guards/user-only-guard';
import { authorOnlyGuard } from '../core/guards/author-only-guard';

export const gamesRoutes: Routes = [
  { path: '', component: GameList, pathMatch: 'full' },
  { path: 'create', component: CreateGame, canActivate: [userOnlyGuard] },
  { path: 'details/:gameId', component: GameDetails },
  {
    path: 'edit/:gameId',
    component: GameEdit,
    canActivate: [userOnlyGuard, authorOnlyGuard],
  },
];
