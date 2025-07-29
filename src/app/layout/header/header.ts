import { Component, Signal } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

//? Material
import { MatToolbarRow, MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../core/services/auth.service';
import slideAnimation from '../../animations/slideAnimation';
import fadeLeftAnimation from '../../animations/fadeLeftAnimation';

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
  animations: [slideAnimation(600, 'Y'), fadeLeftAnimation()],
})
export class Header {
  public isUser: Signal<boolean>;
  public user;

  constructor(private authService: AuthService) {
    this.isUser = this.authService.isLoggedIn;
    this.user = this.authService.user;
  }
  public logoutEventHandler(e: MouseEvent) {
    e.preventDefault();
    this.authService.logout().subscribe();
  }
}
