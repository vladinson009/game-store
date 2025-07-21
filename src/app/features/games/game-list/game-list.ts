import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FocusInput } from '../../../shared/directives/focus-input.directive';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import slideAnimation from '../../../animations/slideAnimation';
import { Paginator } from '../../../shared/components/paginator/paginator';
import { GameService } from '../../../core/services/game.service';
import {
  GameCollectionSingleResponse,
  GamesCollectionResponse,
} from '../../../models/game';
import { GameCard } from '../game-card/game-card';
import { AuthService } from '../../../core/services/auth.service';
import { Pagination } from '../../../models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class GameList implements OnInit {
  public games = signal<GameCollectionSingleResponse[] | undefined>(undefined);
  public userId = signal<string | undefined>(undefined);
  public pagination = signal<Pagination>({
    total: 0,
    limit: 5,
    page: 0,
    totalPages: 0,
  });

  constructor(
    private gameService: GameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadGames();

    // this.gameService.getAll().subscribe((res: GamesCollectionResponse) => {
    //   this.games.set(res.data);
    //   this.pagination.set(res.pagination);

    // });
  }
  public onToggleLike(game: GameCollectionSingleResponse) {
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
  private loadGames(): void {
    const { page, limit } = this.pagination();

    this.gameService
      .getAll(page, limit)
      .subscribe((res: GamesCollectionResponse) => {
        this.userId.set(this.authService.user()?._id);
        this.games.set(res.data);
        this.pagination.set(res.pagination);
      });
  }
  public onPageChanged(event: PageEvent): void {
    const newPagination: Pagination = {
      total: event.length,
      limit: event.pageSize,
      page: event.pageIndex + 1,
      totalPages: Math.ceil(event.length / event.pageSize),
    };
    console.log(newPagination);

    this.pagination.set(newPagination);
    this.loadGames();
  }
}
