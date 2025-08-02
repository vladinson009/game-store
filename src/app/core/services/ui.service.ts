import type { OpenSnackBar } from '../../models/snackBar';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//? Material
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  // Custom snackbar with parameters showing notification
  openSnackBar(
    message: string,
    action = '',
    duration = 4000,
    config: OpenSnackBar = {}
  ) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration,
      horizontalPosition: config.horizontalPosition ?? 'center',
      verticalPosition: config.verticalPosition ?? 'top',
      panelClass: config.panelClass ?? ['snackbar-default'],
    });

    if (action && config.redirectTo) {
      snackBarRef
        .onAction()
        .subscribe(() => this.router.navigate([config.redirectTo]));
    }
  }
}

//TODO: Custom Snackbar component
// const sbr = this.snackBar.openFromComponent(Login, {
//   horizontalPosition: 'center',
//   verticalPosition: 'top',
//   duration: 3000,
// });
