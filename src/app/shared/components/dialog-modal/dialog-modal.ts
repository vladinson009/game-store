import { Component, Inject } from '@angular/core';

// ? Material
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-modal',
  imports: [MatDialogModule, MatButtonModule, MatIcon],
  templateUrl: './dialog-modal.html',
  styleUrl: './dialog-modal.css',
})
export class DialogModal {
  //Reusable dialog modal

  public message: string | undefined;
  public onAction: Function;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogModal>
  ) {
    this.message = data.message;
    this.onAction = data.onAction;
  }

  onDelete() {
    this.onAction();
    this.dialogRef.close();
  }
  onCancel() {
    this.dialogRef.close();
  }
}
