import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  Signal,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { GameService } from '../../../core/services/game.service';
import { GameCollectionSingleResponse } from '../../../models/game';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { JoinArrayPipe } from '../../../shared/pipes/join-array';
import slideAnimation from '../../../animations/slideAnimation';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { AuthUserResponse } from '../../../models/user';
import { FormatDataPipe } from '../../../shared/pipes/format-data-pipe';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-game-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinner,
    JoinArrayPipe,
    DatePipe,
    CurrencyPipe,
    FormatDataPipe,
    MatIcon,
  ],
  templateUrl: './game-details.html',
  styleUrl: './game-details.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class GameDetails implements OnInit, OnChanges {
  public gameId = input<string>('');
  public gameSignal = signal<GameCollectionSingleResponse | null>(null);
  public isLiked = signal<boolean>(false);
  public isOwner: boolean = false;
  public isLogged: boolean = false;
  public like = output();

  constructor(
    private gameService: GameService,
    private authService: AuthService
  ) {}

  toggleLike() {
    if (this.isLiked()) {
      this.gameService.pullLike(this.gameId()).subscribe((res) => {
        this.gameSignal.update((prevValue) => {
          const oldValue = { ...prevValue };
          oldValue.likes = res.likes;
          oldValue.updatedAt = res.updatedAt;
          return oldValue as GameCollectionSingleResponse;
        });
        this.isLiked.set(false);
      });
    } else {
      this.gameService.addLike(this.gameId()).subscribe((res) => {
        this.gameSignal.update((prevValue) => {
          const oldValue = { ...prevValue };
          oldValue.likes = res.likes;
          oldValue.updatedAt = res.updatedAt;
          return oldValue as GameCollectionSingleResponse;
        });
        this.isLiked.set(true);
      });
    }
  }
  ngOnInit() {
    this.gameService.getById(this.gameId()).subscribe((response) => {
      const user = this.authService.user();
      this.gameSignal.set(response);

      if (user) {
        const isLiked =
          response.likes?.some((el) => el._id === user._id) || false;
        this.isLogged = true;
        this.isOwner = response.author._id === user._id;
        this.isLiked.set(isLiked);
      }
    });
  }
  ngOnChanges() {}
}
