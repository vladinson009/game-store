import type { GameCollectionSingleResponse } from '../../models/game';

import { Component, OnInit, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

// ? Material
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { AuthService } from '../../core/services/auth.service';
import { GameService } from '../../core/services/game.service';
import slideAnimation from '../../animations/slideAnimation';
import { finalize } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-profile',
  imports: [
    MatIcon,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    TitleCasePipe,
    RouterLink,
    MatButtonModule,
    MatProgressSpinner,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class Profile implements OnInit {
  public isLoading = signal(true);
  public user;
  public myGames = signal<GameCollectionSingleResponse[]>([]);
  public columnsToDisplay = ['title', 'price'];
  public columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  expandedElement!: GameCollectionSingleResponse | null;

  isExpanded(element: GameCollectionSingleResponse) {
    return this.expandedElement === element;
  }

  toggle(element: GameCollectionSingleResponse) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {
    this.user = this.authService.user;
  }
  // Fetch own records limited to recent 100
  fetchOwnRecords() {
    const queryParams = {
      limit: '100',
    };
    this.gameService
      .getAll(queryParams)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((res) => {
        this.myGames.set(
          res.data.filter((data) => data.author._id === this.user()?._id)
        );
      });
  }

  ngOnInit(): void {
    this.fetchOwnRecords();
  }
}
