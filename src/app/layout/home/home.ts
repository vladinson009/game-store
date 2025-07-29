import type { GameCollectionSingleResponse } from '../../models/game';

import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { Component, OnInit, signal } from '@angular/core';

// ? Material
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import carouselAnimation from '../../animations/carouselAnimation';
import slideAnimation from '../../animations/slideAnimation';
import { RouterLink } from '@angular/router';
import { Platforms } from '../../shared/components/platforms/platforms';
import { GameService } from '../../core/services/game.service';
export interface HomeType {
  name: string;
  message: string;
  imageUrl?: string;
  role?: string;
}
@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    CommonModule,
    RouterLink,
    Platforms,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  animations: [carouselAnimation(800), slideAnimation(800, 'Y')],
})
export class Home implements OnInit {
  public isLoading = signal(true);
  public testimonial = signal<GameCollectionSingleResponse[] | []>([]);

  constructor(private gameService: GameService) {}
  ngOnInit() {
    this.gameService
      .getRecent()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((res) => {
        this.testimonial.set(res.data);
      });
  }
}
