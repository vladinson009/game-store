import { Component, computed, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameCollectionSingleResponse } from '../../../models/game';
import { RouterLink } from '@angular/router';
import { JoinArrayPipe } from '../../../shared/pipes/join-array';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-card',
  imports: [MatCardModule, RouterLink, JoinArrayPipe, MatIcon, MatButtonModule],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css',
})
export class GameCard {
  public gameSignal = input<GameCollectionSingleResponse>();
  public userId = input<string | undefined>(undefined);
  public like = output();
  public isLoading = input<boolean>();
  public isLiked = computed(
    () =>
      this.gameSignal()?.likes?.some((like) => like._id === this.userId()) ??
      false
  );
  toggleLike() {
    this.like.emit();
  }
}
