import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { AuthService } from './core/services/auth.service';
import { GameService } from './core/services/game.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  public totalGames = signal<number | null>(null);
  private subscriptions = new Subscription();
  constructor(
    private authService: AuthService,
    private gameService: GameService
  ) {
    if (this.authService.getLocalStorage()) {
      this.authService.retrieveUser().subscribe();
    }
  }

  ngOnInit(): void {
    // Using switchMap to make flat subscription easy for managing unsubscription

    const subsc = this.gameService
      .getRecent()
      .pipe(switchMap(() => this.gameService.totalGames$))
      .subscribe((res) => this.totalGames.set(res));
    this.subscriptions.add(subsc);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
