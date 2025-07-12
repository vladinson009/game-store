import { Component } from '@angular/core';

//? Material
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CopyrightDirective } from '../../shared/directives/copyright.directive';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarRow, MatToolbar, CopyrightDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
