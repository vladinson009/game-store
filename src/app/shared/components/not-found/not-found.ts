import { Component } from '@angular/core';
import slideAnimation from '../../../animations/slideAnimation';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  animations: [slideAnimation(1000, 'X')],
})
export class NotFound {}
