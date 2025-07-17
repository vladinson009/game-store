import { Component } from '@angular/core';
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/select';
import { FocusInput } from '../../../shared/directives/focus-input.directive';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import fadeLeftAnimation from '../../../animations/fadeLeftAnimation';
import slideAnimation from '../../../animations/slideAnimation';
import carouselAnimation from '../../../animations/carouselAnimation';

@Component({
  selector: 'app-game-list',
  imports: [
    MatFormFieldModule,
    MatIcon,
    MatInput,
    FocusInput,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
  animations: [
    fadeLeftAnimation(),
    slideAnimation(1000, 'Y'),
    carouselAnimation(1000),
  ],
})
export class GameList {}
//TODO: Paginator
