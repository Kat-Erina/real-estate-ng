import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  dialogRef=inject(MatDialogRef<ConfirmDialogComponent>);
  dialogData=inject(MAT_DIALOG_DATA)

  closeDialog(){
    this.dialogRef.close(false);
    }
    
  confirmdDelete(){
    this.dialogRef.close(true)
  }
}
