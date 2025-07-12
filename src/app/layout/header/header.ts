import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
//? Material
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarRow,
    MatToolbar,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
