import {
  Component,
  EventEmitter,
  input,
  output,
  Signal,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Author, GameCollectionSingleResponse } from '../../../models/game';
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
  public like = output<GameCollectionSingleResponse>();

  isLiked() {
    if (
      this.game()?.likes?.findIndex((el: Author) => el._id === this.userId()) !=
      -1
    ) {
      return true;
    }
    return false;
  }

  toggleLike() {
    this.like.emit(this.game()!);
  }
}
