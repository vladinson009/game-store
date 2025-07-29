import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// ? Material
import { MatButtonModule } from '@angular/material/button';

import slideAnimation from '../../../animations/slideAnimation';
@Component({
  selector: 'app-not-found',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
  animations: [slideAnimation(1000, 'X')],
})
export class NotFound {}
