import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

@Component({
  selector: 'app-game-list',
  imports: [MatToolbar, MatToolbarRow, MatButtonModule],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList {}
