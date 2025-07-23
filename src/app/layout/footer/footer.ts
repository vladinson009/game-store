import { Component, input } from '@angular/core';

//? Material
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { CopyrightDirective } from '../../shared/directives/copyright.directive';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarRow, MatToolbar, CopyrightDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  totalGames = input<number | null>(null);
}
