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
  GameCollectionSingleResponse,
  GamesCollectionResponse,
} from '../../../models/game';
import { GameCard } from '../game-card/game-card';
import { AuthService } from '../../../core/services/auth.service';

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
  public games = signal<GameCollectionSingleResponse[] | null>(null);
  public userId = signal<string | undefined>(undefined);
  public limit = signal<number | null>(null);
  public page = signal<number | null>(null);
  public total = signal<number | null>(null);
  public totalPage = signal<number | null>(null);

  constructor(
    private gameService: GameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.gameService.getAll().subscribe((res: GamesCollectionResponse) => {
      this.games.set(res.data);
      this.limit.set(res.pagination.limit);
      this.page.set(res.pagination.page);
      this.total.set(res.pagination.total);
      this.totalPage.set(res.pagination.totalPages);

      this.userId.set(this.authService.user()?._id);
    });
  }
}
