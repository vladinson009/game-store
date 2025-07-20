import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FocusInput } from '../../../shared/directives/focus-input.directive';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import fadeLeftAnimation from '../../../animations/fadeLeftAnimation';
import slideAnimation from '../../../animations/slideAnimation';
import carouselAnimation from '../../../animations/carouselAnimation';
import { Paginator } from '../../../shared/components/paginator/paginator';
import { GameService } from '../../../core/services/game.service';
import {
  Author,
  GameCollectionSingleResponse,
  GamesCollectionResponse,
} from '../../../models/game';
import { GameCard } from '../game-card/game-card';
import { AuthService } from '../../../core/services/auth.service';
import { Pagination } from '../../../models/pagination';

@Component({
  selector: 'app-game-list',
  imports: [
    MatFormFieldModule,
    MatIcon,
    MatInput,
    FocusInput,
    MatCardModule,
    MatButtonModule,
    Paginator,
    GameCard,
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
  animations: [
    fadeLeftAnimation(),
    slideAnimation(1000, 'Y'),
    carouselAnimation(1000),
  ],
})
export class GameList implements OnInit {
  public games = signal<GameCollectionSingleResponse[] | undefined>(undefined);
  public userId = signal<string | undefined>(undefined);
  public pagination = signal<Pagination | null>(null);

  constructor(
    private gameService: GameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.gameService.getAll().subscribe((res: GamesCollectionResponse) => {
      this.games.set(res.data);
      this.pagination.set(res.pagination);

      this.userId.set(this.authService.user()?._id);
    });
  }
  onToggleLike(game: GameCollectionSingleResponse) {
    const userId = this.userId();
    const isLiked = game.likes?.some((l) => l._id == userId);

    if (isLiked) {
      this.gameService.pullLike(game._id).subscribe(() => {
        game.likes = game.likes?.filter((l) => l._id !== userId);
        this.games.update((games) =>
          games?.map((g) =>
            g._id === game._id ? { ...g, likes: game.likes } : g
          )
        );
      });
    } else {
      this.gameService.addLike(game._id).subscribe(() => {
        // Add user to likes
        const currentUser = this.authService.user();
        if (currentUser) {
          game.likes = [...(game.likes ?? []), { _id: currentUser._id }];
          this.games.update((games) =>
            games?.map((g) =>
              g._id === game._id ? { ...g, likes: game.likes } : g
            )
          );
        }
      });
    }
  }
}
