import type { GameCollectionSingleResponse } from '../../../models/game';

import { Component, input, OnInit, output, signal } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import slideAnimation from '../../../animations/slideAnimation';
import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { FormatDataPipe } from '../../../shared/pipes/format-data-pipe';
import { DialogModal } from '../../../shared/components/dialog-modal/dialog-modal';

// ? Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-game-details',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinner,
    DatePipe,
    CurrencyPipe,
    FormatDataPipe,
    MatIcon,
    RouterLink,
    MatChipsModule,
  ],
  templateUrl: './game-details.html',
  styleUrl: './game-details.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class GameDetails implements OnInit {
  public gameId = input<string>('');
  public gameSignal = signal<GameCollectionSingleResponse | null>(null);
  public isLiked = signal<boolean>(false);
  public isOwner: boolean = false;
  public isLogged: boolean = false;
  public like = output();
  public isLoading = signal(false);

  constructor(
    private gameService: GameService,
    private authService: AuthService,
    private location: Location,
    private dialog: MatDialog,
    private router: Router
  ) {}

  // Toggle like event handler
  toggleLike() {
    this.isLoading.set(true);
    if (this.isLiked()) {
      this.gameService
        .pullLike(this.gameId())
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe((res: GameCollectionSingleResponse) => {
          this.gameSignal.update((prevValue) => {
            const oldValue = { ...prevValue };
            oldValue.likes = res.likes;
            oldValue.updatedAt = res.updatedAt;
            return oldValue as GameCollectionSingleResponse;
          });
          this.isLiked.set(false);
        });
    } else {
      this.gameService
        .addLike(this.gameId())
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe((res: GameCollectionSingleResponse) => {
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

  // Always send you back to the page from where did you came to details
  onBack() {
    this.location.back();
  }

  // Open dialog modal to confirm delete action
  openDialog() {
    this.dialog.open(DialogModal, {
      data: {
        message: this.gameSignal()?.title,
        onAction: () => this.onDeleteGame(),
        onClose: () => null,
      },
    });
  }
  // Delete game handler
  public onDeleteGame() {
    this.isLoading.set(true);
    this.gameService
      .deleteById(this.gameId())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((res) => {
        this.router.navigate(['/games']);
      });
  }
  ngOnInit() {
    // Demonstrate use of input signals for URL params
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
}
