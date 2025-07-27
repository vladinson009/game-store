import { Component, OnInit, Signal, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { GameService } from '../../core/services/game.service';
import { GameCollectionSingleResponse } from '../../models/game';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AuthUserResponse } from '../../models/user';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import slideAnimation from '../../animations/slideAnimation';
import { RouterLink } from '@angular/router';

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
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  animations: [slideAnimation(1000, 'Y')],
})
export class Profile implements OnInit {
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

  ngOnInit(): void {
    const queryParams = {
      limit: '100',
    };

    this.gameService.getAll(queryParams).subscribe((res) => {
      this.myGames.set(
        res.data.filter((data) => data.author._id === this.user()?._id)
      );
    });
  }
}
