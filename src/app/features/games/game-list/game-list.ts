import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
import { GameSearchbar } from '../game-searchbar/game-searchbar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { QueryParams } from '../../../models/queryParams';

@Component({
  selector: 'app-game-list',
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    Paginator,
    GameCard,
    CommonModule,
    GameSearchbar,
    MatProgressSpinner,
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
  animations: [slideAnimation(1000, 'X')],
})
export class GameList implements OnInit, OnDestroy {
  private subscriptions: Subscription | undefined;
  public games = signal<GameCollectionSingleResponse[] | undefined>(undefined);
  public userId = signal<string | undefined>(undefined);
  public pagination = signal<Pagination>({
    total: 0,
    limit: 5,
    page: 0,
    totalPages: 0,
  });
  public isLoading = signal<boolean>(false);

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
          game.likes = [
            ...(game.likes ?? []),
            { _id: currentUser._id, username: currentUser.username },
          ];
          this.games.update((games) =>
            games?.map((g) =>
              g._id === game._id ? { ...g, likes: game.likes } : g
            )
          );
        }
      });
    }
  }
  private loadGames(params: QueryParams): void {
    this.isLoading.set(true);
    this.gameService
      .getAll(params)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((res: GamesCollectionResponse) => {
        this.userId.set(this.authService.user()?._id);
        this.games.set(res.data);
        this.pagination.set(res.pagination);
      });
  }
  public onPageChanged(event: PageEvent): void {
    const newPage = event.pageIndex + 1;
    const newLimit = event.pageSize;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: newPage,
        limit: newLimit,
      },
      queryParamsHandling: 'merge',
    });
  }
  private queryParamsHandler() {
    this.subscriptions = this.route.queryParams.subscribe((params) => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== '')
      );
      this.pagination.update((prev) => ({ ...prev, ...filteredParams }));
      this.loadGames(filteredParams);
    });
  }
  onSearch(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { title: value },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.queryParamsHandler();
  }
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
