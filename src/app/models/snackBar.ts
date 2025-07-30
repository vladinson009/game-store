import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

export interface OpenSnackBar {
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
  panelClass?: string[];
  redirectTo?: string;
}
