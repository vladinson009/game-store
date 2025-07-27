import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

export const authorOnlyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const gameService = inject(GameService);
  const router = inject(Router);
  const userId = authService.user()?._id;
  const gameId = route.paramMap.get('gameId')!;

  let isAuthor: boolean = false;

  gameService.getById(gameId).subscribe((game) => {
    isAuthor = !!userId && game.author._id.toString() === userId;
  });
  if (isAuthor) {
    return true;
  }
  return router.createUrlTree(['/not-found']);
};
