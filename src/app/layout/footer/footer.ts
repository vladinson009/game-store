import { Component } from '@angular/core';

//? Material
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { CopyrightDirective } from '../../shared/directives/copyright.directive';
import { f } from '../../../../node_modules/@angular/material/icon-module.d-COXCrhrh';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarRow, MatToolbar, CopyrightDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
