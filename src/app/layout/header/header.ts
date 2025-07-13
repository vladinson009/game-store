import { Component, OnInit, Signal } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';
//? Material
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../core/services/auth.service';

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
export class Header {
  isUser: Signal<boolean>;
  user;

  constructor(private authService: AuthService) {
    this.isUser = this.authService.isLoggedIn;
    this.user = this.authService.user;
  }
}
