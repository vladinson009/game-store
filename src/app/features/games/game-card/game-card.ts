import { Component, EventEmitter, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameCollectionSingleResponse } from '../../../models/game';
import { RouterLink } from '@angular/router';
import { PlatformsPipe } from '../../../shared/pipes/platforms.pipe';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-game-card',
  imports: [MatCardModule, RouterLink, PlatformsPipe, MatIcon, MatButtonModule],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  public game = input<GameCollectionSingleResponse>();
  public userId = input<string | undefined>(undefined);
  public like = output<EventEmitter<{ gameId: string; liked: boolean }>>();
  ngOnInit() {}

  isLiked() {
    if (this.userId() === this.game()?.author._id) {
      return true;
    }
    return false;
  }
}
