import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { AuthService } from './core/services/auth.service';
import { GameService } from './core/services/game.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  public totalGames = signal<number | null>(null);

  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.getRecent().subscribe((res) => {
      this.totalGames.set(res.pagination.total);
    });
    if (this.authService.getLocalStorage()) {
      this.authService.retrieveUser().subscribe();
    }
  }
}
